const express = require("express");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const createAdoptionRoutes = ({ petsCollection, usersCollection, adoptionRequestsCollection }) => {
  const router = express.Router();

  router.post("/", verifyToken, async (req, res) => {
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

  router.get("/my-requests", verifyToken, async (req, res) => {
    const requests = await adoptionRequestsCollection
      .find({ requesterEmail: req.user.email })
      .sort({ requestDate: -1 })
      .toArray();
    res.json(requests);
  });

  router.delete("/:id", verifyToken, async (req, res) => {
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

  router.get("/pet/:petId", verifyToken, async (req, res) => {
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

  router.patch("/:id/status", verifyToken, async (req, res) => {
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

    await adoptionRequestsCollection.updateOne({ _id: adoption._id }, { $set: { status } });

    res.json({ message: `Request ${status}` });
  });

  return router;
};

module.exports = createAdoptionRoutes;
