import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const petStories = [
  {
    title: "Real adoption journeys",
    text: "Every profile is built to help families choose with confidence and care.",
  },
  {
    title: "Safe owner contact",
    text: "Requests, status updates, and approvals all stay in one clean flow.",
  },
  {
    title: "Trusted guidance",
    text: "Support for first-time adopters, experienced owners, and everyone in between.",
  },
];

const highlights = ["Verified profiles", "Wishlist support", "Owner approvals", "Theme switch", "Google login"];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
    <div className="fresh-home">
      <section className="fresh-hero">
        <div className="container fresh-hero-grid">
          <motion.div className="fresh-hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="fresh-kicker">PetNest Adoption Studio</p>
            <h1>A fresh home for pets that deserve a forever story.</h1>
            <p>
              A modern adoption experience with animated storytelling, smooth browsing, wishlist saves,
              Google login, and a short hero video that makes the site feel alive.
            </p>
            <div className="fresh-actions">
              <Link to="/pets" className="btn btn-primary">Browse Pets</Link>
              <Link to="/register" className="btn btn-outline">Join Now</Link>
            </div>
            <div className="fresh-highlights">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className="fresh-hero-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="fresh-video-frame">
              <video
                className="fresh-video"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
              >
                <source src="https://media.istockphoto.com/id/1323168773/video/golden-retriever-running-in-a-field.mp4?s=mp4-640x640-is&k=20&c=Y7qv9JQw6c9r4t-5j9y3fG8xj7qkQ1YbZ8nQXh1FQpI=" type="video/mp4" />
              </video>
              <div className="fresh-video-overlay">
                <span>Watch the joy of adoption</span>
                <strong>Short video story</strong>
              </div>
            </div>
            <div className="fresh-floating-card">
              <p>Newest match</p>
              <h3>Happy homes start here</h3>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="fresh-strip">
        <div className="fresh-strip-track">
          <span>Adopt with heart</span>
          <span>Explore verified pets</span>
          <span>Save favorites</span>
          <span>Login with Google</span>
          <span>Scroll for more</span>
          <span>Adopt with heart</span>
          <span>Explore verified pets</span>
          <span>Save favorites</span>
        </div>
      </section>

      <section className="section container fresh-story-section">
        <motion.div className="section-head fresh-section-head" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="fresh-kicker">Why PetNest feels different</p>
          <h2>Designed like a living magazine, built like a real app.</h2>
        </motion.div>
        <motion.div className="fresh-story-grid" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {petStories.map((story) => (
            <motion.article key={story.title} className="fresh-story-card" variants={fadeUp}>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section fresh-feature-section">
        <div className="container">
          <div className="section-head fresh-section-head">
            <p className="fresh-kicker">Available now</p>
            <h2>Featured pets ready for a new chapter.</h2>
            <p>Browse the latest listings with animated transitions and smooth card interactions.</p>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <motion.div className="pet-grid" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              {featuredPets.map((pet) => (
                <motion.div key={pet._id} variants={fadeUp}>
                  <PetCard pet={pet} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="section fresh-cta-section">
        <div className="container fresh-cta-grid">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="fresh-kicker">Animated scroll moments</p>
            <h2>Keep scrolling, keep exploring, keep falling in love.</h2>
            <p>
              The page is built to feel dynamic, elegant, and immersive while still keeping every core
              feature functional.
            </p>
          </motion.div>
          <Link to="/pets" className="btn btn-primary">Find Your Pet</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;