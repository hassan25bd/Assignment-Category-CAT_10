import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <article className="pet-card">
      <img src={pet.imageUrl} alt={pet.petName} className="pet-image" />
      <div className="pet-card-body">
        <p className="pet-badge">{pet.species}</p>
        <h3>{pet.petName}</h3>
        <p>{pet.breed}</p>
        <p>{pet.location}</p>
        <p>Fee: ${pet.adoptionFee}</p>
        <p>Status: {pet.status}</p>
        <Link to={`/pets/${pet._id}`} className="btn btn-outline">
          View Details
        </Link>
      </div>
    </article>
  );
};

export default PetCard;
