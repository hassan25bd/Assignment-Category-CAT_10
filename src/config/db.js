const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);
let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("pet_adoption_platform");
  }
  return db;
};

const getCollections = () => {
  if (!db) {
    throw new Error("Database not connected");
  }

  return {
    usersCollection: db.collection("users"),
    petsCollection: db.collection("pets"),
    adoptionRequestsCollection: db.collection("adoptionRequests"),
  };
};

module.exports = { connectDB, getCollections };
