import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { data } = await api.get("/pets?limit=6");
        setFeaturedPets(data);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hero-tag">Find your forever friend</p>
            <h1>Give a loving home to a pet who needs you</h1>
            <p>
              Explore verified pets from shelters and responsible owners. Safe process, clear profiles,
              and friendly support at every step.
            </p>
            <Link to="/pets" className="btn btn-primary">
              Adopt Now
            </Link>
          </motion.div>
          <div className="hero-art" />
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Featured Pets</h2>
          <p>Meet pets currently available for adoption.</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="pet-grid">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      <section className="section section-soft">
        <div className="container static-grid">
          <article>
            <h3>Why Adopt Pets</h3>
            <p>
              Adoption saves lives, reduces breeding pressure, and creates lasting companionship that
              benefits both pets and families.
            </p>
          </article>
          <article>
            <h3>Success Stories</h3>
            <p>
              Read real journeys from adopters who found loyal friends and gave rescued pets a stable,
              caring home.
            </p>
          </article>
          <article>
            <h3>Pet Care Tips</h3>
            <p>
              Learn daily routines, nutrition basics, grooming guidance, and behavior tips for healthy,
              happy pets.
            </p>
          </article>
          <article>
            <h3>Shelter Spotlight</h3>
            <p>
              Discover partner shelters with transparent care practices and professional screening for
              each adoption.
            </p>
          </article>
          <article>
            <h3>Volunteer Opportunities</h3>
            <p>
              Join local initiatives to foster pets, support events, and improve pet welfare in your
              community.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
