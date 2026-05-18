const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGODB_URI);

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const tokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const verifyOwnerOrAdmin = (emailFromRecord, userEmail) => emailFromRecord === userEmail;

async function run() {
  try {
    const db = client.db("pet_adoption_platform");
    const usersCollection = db.collection("users");
    const petsCollection = db.collection("pets");
    const adoptionRequestsCollection = db.collection("adoptionRequests");

    app.get("/", (req, res) => {
      res.json({ message: "Pet Adoption API is running" });
    });

    app.post("/auth/register", async (req, res) => {
      const { name, email, password, photoURL } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userDoc = {
        name,
        email,
        password: hashedPassword,
        photoURL: photoURL || "",
        provider: "credentials",
        createdAt: new Date(),
      };

      await usersCollection.insertOne(userDoc);
      res.status(201).json({ message: "Registration successful" });
    });

    app.post("/auth/google", async (req, res) => {
      const { name, email, photoURL } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: "Missing Google profile data" });
      }

      const existingUser = await usersCollection.findOne({ email });
      if (!existingUser) {
        await usersCollection.insertOne({
          name,
          email,
          photoURL: photoURL || "",
          provider: "google",
          createdAt: new Date(),
        });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, tokenOptions);
      res.json({ message: "Google login successful", user: { name, email, photoURL } });
    });

    app.post("/auth/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await usersCollection.findOne({ email });
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, tokenOptions);
      res.json({
        message: "Login successful",
        user: { name: user.name, email: user.email, photoURL: user.photoURL || "" },
      });
    });

    app.post("/auth/logout", (req, res) => {
      res.clearCookie("token", tokenOptions);
      res.json({ message: "Logout successful" });
    });

    app.get("/auth/me", verifyToken, async (req, res) => {
      const user = await usersCollection.findOne(
        { email: req.user.email },
        { projection: { password: 0 } }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    });

    app.post("/pets", verifyToken, async (req, res) => {
      const pet = req.body;
      if (pet.ownerEmail !== req.user.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const doc = {
        ...pet,
        status: "available",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await petsCollection.insertOne(doc);
      res.status(201).json({ insertedId: result.insertedId });
    });

    app.get("/pets", async (req, res) => {
      const { search = "", species, sort = "latest", limit } = req.query;

      const query = {};
      if (search) {
        query.petName = { $regex: search, $options: "i" };
      }

      if (species) {
        const speciesArray = species
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        if (speciesArray.length) {
          query.species = { $in: speciesArray };
        }
      }

      const sortQuery =
        sort === "feeLowHigh"
          ? { adoptionFee: 1 }
          : sort === "feeHighLow"
          ? { adoptionFee: -1 }
          : { createdAt: -1 };

      let cursor = petsCollection.find(query).sort(sortQuery);
      if (limit) {
        cursor = cursor.limit(Number(limit));
      }

      const pets = await cursor.toArray();
      res.json(pets);
    });

    app.get("/pets/:id", async (req, res) => {
      const pet = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.json(pet);
    });

    app.get("/pets/owner/listings", verifyToken, async (req, res) => {
      const listings = await petsCollection.find({ ownerEmail: req.user.email }).toArray();
      const total = listings.length;
      const available = listings.filter((item) => item.status === "available").length;
      const adopted = listings.filter((item) => item.status === "adopted").length;

      res.json({
        stats: { total, available, adopted },
        listings,
      });
    });

    app.patch("/pets/:id", verifyToken, async (req, res) => {
      const existing = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!existing) {
        return res.status(404).json({ message: "Pet not found" });
      }
      if (!verifyOwnerOrAdmin(existing.ownerEmail, req.user.email)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updateDoc = {
        $set: {
          ...req.body,
          updatedAt: new Date(),
        },
      };

      await petsCollection.updateOne({ _id: existing._id }, updateDoc);
      res.json({ message: "Pet updated successfully" });
    });

    app.delete("/pets/:id", verifyToken, async (req, res) => {
      const existing = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!existing) {
        return res.status(404).json({ message: "Pet not found" });
      }
      if (!verifyOwnerOrAdmin(existing.ownerEmail, req.user.email)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await petsCollection.deleteOne({ _id: existing._id });
      await adoptionRequestsCollection.deleteMany({ petId: req.params.id });
      res.json({ message: "Pet deleted successfully" });
    });

    app.post("/adoptions", verifyToken, async (req, res) => {
      const { petId, pickupDate, message } = req.body;
      const pet = await petsCollection.findOne({ _id: new ObjectId(petId) });

      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      if (pet.ownerEmail === req.user.email) {
        return res.status(403).json({ message: "Owners cannot adopt their own pet" });
      }
      if (pet.status === "adopted") {
        return res.status(400).json({ message: "This pet is already adopted" });
      }

      const existingRequest = await adoptionRequestsCollection.findOne({
        petId,
        requesterEmail: req.user.email,
      });
      if (existingRequest) {
        return res.status(409).json({ message: "You already requested this pet" });
      }

      const requester = await usersCollection.findOne({ email: req.user.email });

      await adoptionRequestsCollection.insertOne({
        petId,
        petName: pet.petName,
        petOwnerEmail: pet.ownerEmail,
        requesterName: requester?.name || "User",
        requesterEmail: req.user.email,
        requestDate: new Date(),
        pickupDate,
        message,
        status: "pending",
      });

      res.status(201).json({ message: "Adoption request submitted" });
    });

    app.get("/adoptions/my-requests", verifyToken, async (req, res) => {
      const requests = await adoptionRequestsCollection
        .find({ requesterEmail: req.user.email })
        .sort({ requestDate: -1 })
        .toArray();
      res.json(requests);
    });

    app.delete("/adoptions/:id", verifyToken, async (req, res) => {
      const request = await adoptionRequestsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      if (request.requesterEmail !== req.user.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await adoptionRequestsCollection.deleteOne({ _id: request._id });
      res.json({ message: "Request canceled" });
    });

    app.get("/adoptions/pet/:petId", verifyToken, async (req, res) => {
      const pet = await petsCollection.findOne({ _id: new ObjectId(req.params.petId) });
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      if (pet.ownerEmail !== req.user.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const requests = await adoptionRequestsCollection
        .find({ petId: req.params.petId })
        .sort({ requestDate: -1 })
        .toArray();
      res.json(requests);
    });

    app.patch("/adoptions/:id/status", verifyToken, async (req, res) => {
      const { status } = req.body;
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const adoption = await adoptionRequestsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!adoption) {
        return res.status(404).json({ message: "Request not found" });
      }

      const pet = await petsCollection.findOne({ _id: new ObjectId(adoption.petId) });
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      if (pet.ownerEmail !== req.user.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      if (pet.status === "adopted") {
        return res.status(400).json({ message: "Pet already adopted" });
      }

      if (status === "approved") {
        await adoptionRequestsCollection.updateMany(
          { petId: adoption.petId, _id: { $ne: adoption._id } },
          { $set: { status: "rejected" } }
        );
        await petsCollection.updateOne(
          { _id: new ObjectId(adoption.petId) },
          { $set: { status: "adopted", adoptedBy: adoption.requesterEmail, updatedAt: new Date() } }
        );
      }

      await adoptionRequestsCollection.updateOne(
        { _id: adoption._id },
        { $set: { status } }
      );

      res.json({ message: `Request ${status}` });
    });

    app.use((req, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

run();
