const express = require("express");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const createPetRoutes = ({ petsCollection, adoptionRequestsCollection }) => {
  const router = express.Router();

  router.post("/", verifyToken, async (req, res) => {
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

  router.get("/", async (req, res) => {
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

  router.get("/owner/listings", verifyToken, async (req, res) => {
    const listings = await petsCollection.find({ ownerEmail: req.user.email }).toArray();
    const total = listings.length;
    const available = listings.filter((item) => item.status === "available").length;
    const adopted = listings.filter((item) => item.status === "adopted").length;

    res.json({
      stats: { total, available, adopted },
      listings,
    });
  });

  router.get("/:id", async (req, res) => {
    const pet = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  });

  router.patch("/:id", verifyToken, async (req, res) => {
    const existing = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!existing) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (existing.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await petsCollection.updateOne(
      { _id: existing._id },
      {
        $set: {
          ...req.body,
          updatedAt: new Date(),
        },
      }
    );

    res.json({ message: "Pet updated successfully" });
  });

  router.delete("/:id", verifyToken, async (req, res) => {
    const existing = await petsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!existing) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (existing.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await petsCollection.deleteOne({ _id: existing._id });
    await adoptionRequestsCollection.deleteMany({ petId: req.params.id });
    res.json({ message: "Pet deleted successfully" });
  });

  return router;
};

module.exports = createPetRoutes;
