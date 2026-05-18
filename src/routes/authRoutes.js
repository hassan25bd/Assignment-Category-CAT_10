const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const tokenOptions = require("../config/tokenOptions");

const createAuthRoutes = ({ usersCollection }) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { name, email, password, photoURL } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      photoURL: photoURL || "",
      provider: "credentials",
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Registration successful" });
  });

  router.post("/google", async (req, res) => {
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

  router.post("/login", async (req, res) => {
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

  router.post("/logout", (req, res) => {
    res.clearCookie("token", tokenOptions);
    res.json({ message: "Logout successful" });
  });

  router.get("/me", verifyToken, async (req, res) => {
    const user = await usersCollection.findOne(
      { email: req.user.email },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });

  return router;
};

module.exports = createAuthRoutes;
