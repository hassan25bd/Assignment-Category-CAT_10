const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDB, getCollections } = require("./config/db");
const createAuthRoutes = require("./routes/authRoutes");
const createPetRoutes = require("./routes/petRoutes");
const createAdoptionRoutes = require("./routes/adoptionRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Pet Adoption API is running" });
});

async function startServer() {
  try {
    await connectDB();
    const collections = getCollections();

    app.use("/auth", createAuthRoutes(collections));
    app.use("/pets", createPetRoutes(collections));
    app.use("/adoptions", createAdoptionRoutes(collections));

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

startServer();
