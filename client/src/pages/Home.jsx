import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const storyCards = [
  {
    title: "Milo found a sunny balcony home",
    text: "After 42 days in foster care, Milo now spends mornings with his adopter and two rescued birds.",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tara became a therapy companion",
    text: "A calm rabbit with a gentle temperament, Tara now supports children in a local learning center.",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rocky joined an active family",
    text: "Rocky matched with first-time adopters through our owner verification and pickup scheduling flow.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
  },
];

const adoptionSteps = [
  "Browse verified pet profiles",
  "Submit request from details page",
  "Owner reviews and responds",
  "Schedule pickup and welcome home",
];

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
            <p className="hero-tag">Real rescues. Real stories. Real homes.</p>
            <h1>Adopt with confidence from trusted owners and shelters</h1>
            <p>
              PetNest connects adopters with pets that need a second chance. Every listing includes
              health details, vaccination status, and transparent adoption requests.
            </p>
            <div className="hero-actions">
              <Link to="/pets" className="btn btn-primary">
                Adopt Now
              </Link>
              <Link to="/dashboard/add-pet" className="btn btn-outline">
                List a Pet
              </Link>
            </div>
            <div className="hero-metrics">
              <article>
                <h3>800+</h3>
                <p>Successful adoptions</p>
              </article>
              <article>
                <h3>120+</h3>
                <p>Active verified listings</p>
              </article>
              <article>
                <h3>96%</h3>
                <p>Positive adopter feedback</p>
              </article>
            </div>
          </motion.div>

          <div className="hero-gallery">
            <div className="hero-main-image" />
            <div className="hero-side-image" />
            <p className="hero-credit">Photography from real rescue and companion pet moments.</p>
          </div>
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

      <section className="section container journey-section">
        <div className="section-head">
          <h2>Adoption Journey</h2>
          <p>Clear process from discovery to pickup.</p>
        </div>
        <div className="journey-grid">
          {adoptionSteps.map((step, index) => (
            <article key={step}>
              <span>0{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section container stories-section">
        <div className="section-head">
          <h2>Community Success Stories</h2>
          <p>Recent moments shared by adopters and foster families.</p>
        </div>
        <div className="stories-grid">
          {storyCards.map((item) => (
            <article key={item.title} className="story-card">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
