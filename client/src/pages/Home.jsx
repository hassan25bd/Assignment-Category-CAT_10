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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
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
          <motion.div
            className="convert-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.p
              className="convert-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Happy tails
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Making every rescued pet's life more comfortable
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              PetNest is a pet adoption platform where families meet verified pets, send requests,
              and safely complete their adoption journey.
            </motion.p>
            <motion.div
              className="convert-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link to="/pets" className="btn btn-primary">
                View Pets
              </Link>
              <Link to="/dashboard/my-requests" className="btn btn-outline">
                My Requests
              </Link>
            </motion.div>
            <motion.div
              className="convert-metrics"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              {[
                { num: "1.2K+", label: "Happy adoptions" },
                { num: "240+", label: "Premium listings" },
                { num: "99%", label: "Owner trust score" },
              ].map((item, i) => (
                <motion.article key={i} variants={itemVariants}>
                  <h3>{item.num}</h3>
                  <p>{item.label}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="convert-hero-media"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="convert-main-shot" />
            <div className="convert-side-shot" />
            <motion.div
              className="convert-review-chip"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4>20k+ community reviews</h4>
              <p>Trusted by adopters for safe and smooth pet adoption.</p>
            </motion.div>
          </motion.div>
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

      <section className="section container">
        <motion.div
          className="convert-service-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {serviceCards.map((item) => (
            <motion.article key={item.title} className="convert-service-card" variants={itemVariants}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to="/pets" className="btn btn-outline btn-sm">
                Learn More
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section container convert-pets-wrap">
        <motion.div
          className="section-head convert-head"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Featured Pets</h2>
          <p>Meet pets ready to be adopted today.</p>
        </motion.div>
        {loading ? (
          <Spinner />
        ) : (
          <motion.div
            className="pet-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredPets.map((pet) => (
              <motion.div key={pet._id} variants={itemVariants}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <section className="section convert-category-band">
        <div className="container">
          <motion.div
            className="section-head convert-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Adopt by pet type</h2>
            <p>Choose your preferred companion category and explore available pets.</p>
          </motion.div>
          <motion.div
            className="convert-category-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {adoptionGroups.map((item) => (
              <motion.article key={item} className="convert-category-card" variants={itemVariants}>
                <h4>{item}</h4>
                <Link to="/pets" className="btn btn-outline btn-sm">
                  Browse
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section convert-testimonials">
        <div className="container section-head convert-head-light">
          <h2>Happy tails from adopters</h2>
          <p>Real feedback from families who adopted on PetNest.</p>
        </div>
        <motion.div
          className="container convert-testimonial-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stories.map((item) => (
            <motion.article key={item.name} className="convert-testimonial-card" variants={itemVariants}>
              <p>{item.text}</p>
              <h4>{item.name}</h4>
              <span>{item.city}</span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section container convert-blog">
        <motion.div
          className="blog-head-grid convert-head"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="convert-kicker">Adoption Tips</p>
            <h2>Guides for your first weeks together</h2>
          </div>
          <p>
            Learn about health checks, behavior, and routines to help your adopted pet settle in.
          </p>
        </motion.div>

        <motion.div
          className="blog-grid convert-blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              img: "https://images.unsplash.com/photo-1625460822294-9f7d7f3d53cb?auto=format&fit=crop&w=1200&q=80",
              title: "Preparing your home before your adopted pet arrives",
            },
            {
              img: "https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=1200&q=80",
              title: "How to build trust with your new rescue in the first 7 days",
            },
          ].map((blog, i) => (
            <motion.article key={i} className="blog-article" variants={itemVariants}>
              <img src={blog.img} alt={blog.title} loading="lazy" />
              <h3>{blog.title}</h3>
              <Link to="/pets" className="btn btn-outline btn-sm">
                Read More
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="convert-partner-band">
        <motion.div
          className="container convert-partner-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["Rescue Alliance", "Pet Health BD", "Foster Circle", "Safe Paws", "Adopt Local", "Shelter Link"].map((logo) => (
            <motion.p key={logo} variants={itemVariants}>
              {logo}
            </motion.p>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
