import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadPet = async () => {
      try {
        const { data } = await api.get(`/pets/${id}`);
        setPet(data);
      } catch (error) {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id, navigate]);

  const handleAdopt = async (e) => {
    e.preventDefault();
    try {
      await api.post("/adoptions", {
        petId: id,
        pickupDate,
        message,
      });
      toast.success("Adoption request submitted");
      setMessage("");
      setPickupDate("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  if (loading) return <Spinner fullPage />;
  if (!pet) return null;

  return (
    <section className="container section details-grid">
      <motion.article
        className="details-card"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <img src={pet.imageUrl} alt={pet.petName} className="details-image" />
        <h2>{pet.petName}</h2>
        <p>{pet.description}</p>
        <div className="details-meta">
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Health: {pet.healthStatus}</p>
          <p>Vaccination: {pet.vaccinationStatus}</p>
          <p>Location: {pet.location}</p>
          <p>Adoption Fee: ${pet.adoptionFee}</p>
          <p>Status: {pet.status}</p>
        </div>
      </motion.article>

      <motion.form
        onSubmit={handleAdopt}
        className="form-card"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <h3>Adoption Form</h3>
        <label>
          Pet Name
          <input value={pet.petName} readOnly />
        </label>
        <label>
          User Name
          <input value={user?.name || ""} readOnly />
        </label>
        <label>
          User Email
          <input value={user?.email || ""} readOnly />
        </label>
        <label>
          Pickup Date
          <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share why you want to adopt this pet"
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={pet.status === "adopted"}>
          {pet.status === "adopted" ? "Already Adopted" : "Adopt"}
        </button>
      </motion.form>
    </section>
  );
};

export default PetDetails;
