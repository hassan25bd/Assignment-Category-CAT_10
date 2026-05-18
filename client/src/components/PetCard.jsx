import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  const speciesClass = `species-${(pet.species || "pet").toLowerCase()}`;

  const getSpeciesEmoji = (species) => {
    const emojis = {
      dog: "🐕",
      cat: "🐈",
      bird: "🐦",
      rabbit: "🐰",
      hamster: "🐹",
      default: "🐾",
    };
    return emojis[species?.toLowerCase()] || emojis.default;
  };

  const handleImageError = (e) => {
    e.target.src = `https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80`;
  };

  return (
    <article className={`pet-card ${speciesClass}`}>
      {/* Status Badge */}
      <div
        className={`status-ribbon ${pet.status === "adopted" ? "adopted" : "available"}`}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: "10",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>{pet.status === "adopted" ? "❤️" : "✨"}</span>
        <span style={{ textTransform: "capitalize", fontSize: "12px", fontWeight: "700" }}>
          {pet.status}
        </span>
      </div>

      {/* Pet Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={pet.imageUrl}
          alt={pet.petName || "Pet"}
          className="pet-image"
          onError={handleImageError}
          style={{ transition: "transform 0.3s ease" }}
        />
      </div>

      {/* Pet Details */}
      <div className="pet-card-body">
        {/* Species Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "18px" }}>{getSpeciesEmoji(pet.species)}</span>
          <p className="pet-badge" style={{ margin: "0", fontSize: "13px" }}>
            {pet.species || "Pet"}
          </p>
        </div>

        {/* Pet Name */}
        <h3 style={{ marginBottom: "4px", fontSize: "18px" }}>{pet.petName || "Unnamed Pet"}</h3>

        {/* Breed & Age */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            margin: "0 0 6px 0",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>📋</span>
          {pet.breed} {pet.age ? `• ${pet.age} yrs` : ""}
        </p>

        {/* Location */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            margin: "0 0 6px 0",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>📍</span>
          {pet.location || "Location not specified"}
        </p>

        {/* Adoption Fee */}
        <p
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--brand)",
            margin: "0 0 10px 0",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>💳</span>
          Fee: ${pet.adoptionFee || "0"}
        </p>

        {/* Health Status */}
        {pet.healthStatus && (
          <p
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "10px",
              color: pet.healthStatus === "healthy" ? "#059669" : "#d97706",
            }}
          >
            <span>{pet.healthStatus === "healthy" ? "✅" : "⚠️"}</span>
            {pet.healthStatus === "healthy" ? "Healthy" : "Special Care"}
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/pets/${pet._id}`}
          className="btn btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: "14px",
            padding: "10px 12px",
            marginTop: "4px",
          }}
        >
          👀 View Details
        </Link>
      </div>
    </article>
  );
};

export default PetCard;
