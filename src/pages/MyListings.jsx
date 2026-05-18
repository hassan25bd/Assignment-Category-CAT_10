import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import PetFormFields from "../components/PetFormFields";

const getInitialForm = (ownerEmail = "") => ({
  petName: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  imageUrl: "",
  healthStatus: "",
  vaccinationStatus: "",
  location: "",
  adoptionFee: 0,
  description: "",
  ownerEmail,
});

const MyListings = () => {
  const [data, setData] = useState({ stats: { total: 0, available: 0, adopted: 0 }, listings: [] });
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [requests, setRequests] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editFormData, setEditFormData] = useState(getInitialForm());

  const loadListings = async () => {
    try {
      const res = await api.get("/pets/owner/listings");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const openRequests = async (pet) => {
    setSelectedPet(pet);
    const { data: requestData } = await api.get(`/adoptions/pet/${pet._id}`);
    setRequests(requestData);
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      await api.patch(`/adoptions/${requestId}/status`, { status });
      toast.success(`Request ${status}`);
      if (selectedPet) {
        await openRequests(selectedPet);
      }
      loadListings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const deletePet = async (petId) => {
    try {
      await api.delete(`/pets/${petId}`);
      toast.success("Pet deleted");
      loadListings();
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const openEdit = (pet) => {
    setEditPet(pet);
    setEditFormData({
      petName: pet.petName,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      imageUrl: pet.imageUrl,
      healthStatus: pet.healthStatus,
      vaccinationStatus: pet.vaccinationStatus,
      location: pet.location,
      adoptionFee: pet.adoptionFee,
      description: pet.description,
      ownerEmail: pet.ownerEmail,
    });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/pets/${editPet._id}`, editFormData);
      toast.success("Listing updated");
      setEditPet(null);
      loadListings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <h2>My Listings</h2>
      <div className="stats-grid">
        <article>
          <h3>Total Listings</h3>
          <p>{data.stats.total}</p>
        </article>
        <article>
          <h3>Available</h3>
          <p>{data.stats.available}</p>
        </article>
        <article>
          <h3>Adopted</h3>
          <p>{data.stats.adopted}</p>
        </article>
      </div>

      <div className="pet-grid">
        {data.listings.map((pet) => (
          <article key={pet._id} className="pet-card">
            <img src={pet.imageUrl} alt={pet.petName} className="pet-image" />
            <div className="pet-card-body">
              <h3>{pet.petName}</h3>
              <p>Fee: ${pet.adoptionFee}</p>
              <p>Status: {pet.status}</p>
              <div className="card-actions">
                <button className="btn btn-outline btn-sm" onClick={() => openRequests(pet)}>
                  Requests
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => openEdit(pet)}>
                  Edit
                </button>
                <Link to={`/pets/${pet._id}`} className="btn btn-outline btn-sm">
                  View
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(pet)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedPet && (
        <div className="modal-overlay" onClick={() => setSelectedPet(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Requests for {selectedPet.petName}</h3>
            {requests.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              requests.map((request) => (
                <article key={request._id} className="request-item">
                  <p>{request.requesterName}</p>
                  <p>{request.requesterEmail}</p>
                  <p>Pickup: {request.pickupDate}</p>
                  <p>Status: {request.status}</p>
                  {request.status === "pending" ? (
                    <div className="card-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateRequestStatus(request._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateRequestStatus(request._id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : null}
                </article>
              ))
            )}
            <button className="btn btn-outline" onClick={() => setSelectedPet(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {editPet && (
        <div className="modal-overlay" onClick={() => setEditPet(null)}>
          <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={submitEdit}>
            <h3>Update {editPet.petName}</h3>
            <div className="form-grid">
              <PetFormFields formData={editFormData} setFormData={setEditFormData} readOnlyOwnerEmail />
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setEditPet(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Delete {deleteTarget.petName}?</h3>
            <p>This action will remove the listing and all related requests.</p>
            <div className="card-actions">
              <button className="btn btn-danger" onClick={() => deletePet(deleteTarget._id)}>
                Confirm Delete
              </button>
              <button className="btn btn-outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyListings;
