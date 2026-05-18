import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const serviceCards = [
  {
    title: "Adoption Matching",
    text: "Find pets that fit your lifestyle, space, and family routine.",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rescue Support",
    text: "Get trusted guidance on vet checks, behavior notes, and transitions.",
    image:
      "https://images.unsplash.com/photo-1603123853880-a92fafb7809f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Forever Home Plan",
    text: "Prepare your home before pickup and make the first week stress-free.",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80",
  },
];

const adoptionGroups = ["Dogs", "Cats", "Rabbits", "Birds", "Seniors", "Special Care"];

const stories = [
  {
    name: "Aisha Rahman",
    city: "Dhaka",
    text: "The adoption flow was easy and transparent. We found Bruno and brought him home in a week.",
  },
  {
    name: "Sajid Hasan",
    city: "Chattogram",
    text: "Owner verification and status updates made us feel safe during the entire process.",
  },
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
    <div className="home-convert">
      <section className="convert-topline">
        <div className="convert-topline-inner">
          <p>You are one step away from a forever pet friend</p>
          <p>You are one step away from a forever pet friend</p>
          <p>You are one step away from a forever pet friend</p>
          <p>You are one step away from a forever pet friend</p>
        </div>
      </section>

      <section className="convert-hero">
        <div className="container convert-hero-grid">
          <motion.div className="convert-hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="convert-kicker">Happy tails</p>
            <h1>Making every rescued pet's life more comfortable</h1>
            <p>
              PetNest is a pet adoption platform where families meet verified pets, send requests,
              and safely complete their adoption journey.
            </p>
            <div className="convert-actions">
              <Link to="/pets" className="btn btn-primary">
                View Pets
              </Link>
              <Link to="/dashboard/my-requests" className="btn btn-outline">
                My Requests
              </Link>
            </div>
            <div className="convert-metrics">
              <article>
                <h3>1.2K+</h3>
                <p>Happy adoptions</p>
              </article>
              <article>
                <h3>240+</h3>
                <p>Premium listings</p>
              </article>
              <article>
                <h3>99%</h3>
                <p>Owner trust score</p>
              </article>
            </div>
          </motion.div>

          <div className="convert-hero-media">
            <div className="convert-main-shot" />
            <div className="convert-side-shot" />
            <div className="convert-review-chip">
              <h4>20k+ community reviews</h4>
              <p>Trusted by adopters for safe and smooth pet adoption.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="convert-sale-strip">
        <div className="convert-sale-track">
          <p>BIG ADOPTION DRIVE TODAY</p>
          <p>BIG ADOPTION DRIVE TODAY</p>
          <p>BIG ADOPTION DRIVE TODAY</p>
          <p>BIG ADOPTION DRIVE TODAY</p>
        </div>
      </section>

      <section className="section container convert-service-grid">
        {serviceCards.map((item) => (
          <article key={item.title} className="convert-service-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to="/pets" className="btn btn-outline btn-sm">
              Learn More
            </Link>
          </article>
        ))}
      </section>

      <section className="section container convert-pets-wrap">
        <div className="section-head convert-head">
          <h2>Featured Pets</h2>
          <p>Meet pets ready to be adopted today.</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="pet-grid convert-pet-grid">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      <section className="section convert-category-band">
        <div className="container">
          <div className="section-head convert-head">
            <h2>Adopt by pet type</h2>
            <p>Choose your preferred companion category and explore available pets.</p>
          </div>
          <div className="convert-category-grid">
            {adoptionGroups.map((item) => (
              <article key={item} className="convert-category-card">
                <h4>{item}</h4>
                <Link to="/pets" className="btn btn-outline btn-sm">
                  Browse
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section convert-testimonials">
        <div className="container section-head convert-head-light">
          <h2>Happy tails from adopters</h2>
          <p>Real feedback from families who adopted on PetNest.</p>
        </div>
        <div className="container convert-testimonial-grid">
          {stories.map((item) => (
            <article key={item.name} className="convert-testimonial-card">
              <p>{item.text}</p>
              <h4>{item.name}</h4>
              <span>{item.city}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section container convert-blog">
        <div className="blog-head-grid convert-head">
          <div>
            <p className="convert-kicker">Adoption Tips</p>
            <h2>Guides for your first weeks together</h2>
          </div>
          <p>
            Learn about health checks, behavior, and routines to help your adopted pet settle in.
          </p>
        </div>

        <div className="blog-grid convert-blog-grid">
          <article>
            <img
              src="https://images.unsplash.com/photo-1625460822294-9f7d7f3d53cb?auto=format&fit=crop&w=1200&q=80"
              alt="Cat in cozy bed"
            />
            <h3>Preparing your home before your adopted pet arrives</h3>
            <Link to="/pets" className="btn btn-outline btn-sm">
              Read More
            </Link>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=1200&q=80"
              alt="Dog eating healthy food"
            />
            <h3>How to build trust with your new rescue in the first 7 days</h3>
            <Link to="/pets" className="btn btn-outline btn-sm">
              Read More
            </Link>
          </article>
        </div>
      </section>

      <section className="convert-partner-band">
        <div className="container convert-partner-grid">
          {["Rescue Alliance", "Pet Health BD", "Foster Circle", "Safe Paws", "Adopt Local", "Shelter Link"].map((logo) => (
            <p key={logo}>{logo}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
