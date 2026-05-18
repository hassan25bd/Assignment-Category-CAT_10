import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import PetFormFields from "../components/PetFormFields";

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    ownerEmail: user?.email || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pets", formData);
      toast.success("Pet added successfully");
      navigate("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add pet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Add Pet</h2>
      <div className="form-grid">
        <PetFormFields formData={formData} setFormData={setFormData} readOnlyOwnerEmail />
      </div>
      <button className="btn btn-primary" type="submit">
        Save Listing
      </button>
    </form>
  );
};

export default AddPet;
