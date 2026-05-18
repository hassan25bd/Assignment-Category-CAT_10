import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const serviceCards = [
  {
    title: "Dog Adoption",
    text: "Find verified companions and complete a safe adoption journey with confidence.",
  },
  {
    title: "Dog Breeding",
    text: "Responsible matches, health checks, and transparent breeder guidance.",
  },
  {
    title: "Dog Shelter",
    text: "Support rescue shelters and help pets move from care into loving homes.",
  },
];

const breedCards = [
  {
    name: "Samaya",
    breed: "Samoyed",
    image:
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Brody",
    breed: "Siberian Husky",
    image:
      "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Edgar",
    breed: "Golden Retriever",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27c62d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bigela",
    breed: "Beagle",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Gerry",
    breed: "German Shepherd",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
  },
];

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

const articleCards = [
  {
    category: "Groom",
    title: "Give this Vitamin to your Dog to Make the Fur Glowing",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Tips",
    title: "This Is What You Need to Consider Before Adopt a Dog",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Groom",
    title: "Why Grooming Your Dog at Home is Important to do",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
  },
];

const partnerLogos = ["Rescue Alliance", "Pet Health BD", "Foster Circle", "Safe Paws", "Adopt Local", "Shelter Link"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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
    <div className="kintamani-home">
      <section className="hero kintamani-hero">
        <div className="container hero-grid kintamani-hero-grid">
          <motion.div
            className="hero-copy kintamani-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="hero-tag">Best Friend for Your Best Time</p>
            <h1>Find your next pet companion with care, trust, and heart.</h1>
            <p>
              PetNest helps families discover verified pets, connect with owners, and complete a safe
              adoption journey from first visit to forever home.
            </p>
            <div className="hero-actions">
              <Link to="/pets" className="btn btn-primary">
                Adopt Here
              </Link>
              <Link to="/dashboard/my-requests" className="btn btn-outline">
                My Requests
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="kintamani-hero-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="hero-card-top">
              <span className="hero-card-pill">Free Consultation</span>
              <span className="hero-card-phone">(021) 231 - 2870</span>
            </div>
            <div className="hero-card-image" />
          </motion.div>
        </div>
      </section>

      <section className="kintamani-service-band">
        <div className="container service-row kintamani-service-row">
          {serviceCards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`service-card kintamani-service-card ${index === 1 ? "is-elevated" : ""}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="service-icon">🐾</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link to="/pets" className="learn-link">
                Learn More →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section container kintamani-about">
        <motion.div
          className="kintamani-about-grid"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="kintamani-about-visual">
            <div className="kintamani-paw-bg" />
          </div>
          <div className="kintamani-about-copy">
            <p className="hero-tag">About Us</p>
            <h2>Best Service to help more pets find loved homes</h2>
            <p>
              From adoption support to after-care guidance, PetNest offers a warm and trusted path for
              families who want to welcome a pet with confidence.
            </p>
            <div className="kintamani-feature-grid">
              <article>
                <h4>Professional Breeder</h4>
                <p>Verified owners, transparent pet profiles, and safe matches.</p>
              </article>
              <article>
                <h4>Standard Quality</h4>
                <p>Healthy pets, honest details, and a smooth adoption experience.</p>
              </article>
            </div>
            <Link to="/pets" className="btn btn-primary">
              About Us
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="section kintamani-breeds">
        <div className="container">
          <div className="section-head convert-head">
            <p className="hero-tag">The Dogs</p>
            <h2>Popular Dog Breeds</h2>
            <p>Explore beautiful, adoptable breeds and discover who feels like home.</p>
          </div>
          <motion.div
            className="kintamani-breed-stage"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              className="kintamani-breed-hero"
              variants={itemVariants}
            >
              <img
                src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80"
                alt="featured dog"
              />
            </motion.div>

            {breedCards.map((breed) => (
              <motion.article key={breed.name} className="kintamani-breed-spot" variants={itemVariants}>
                <img src={breed.image} alt={breed.name} />
                <span />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="kintamani-stats-band">
        <div className="container kintamani-stats-grid">
          {[
            { value: "50", label: "Participant" },
            { value: "120", label: "Dog Adopted" },
            { value: "35", label: "Experienced Breeder" },
            { value: "20", label: "Year Experience" },
          ].map((stat) => (
            <article key={stat.label}>
              <h3>
                {stat.value} <span>+</span>
              </h3>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container convert-pets-wrap">
        <div className="section-head convert-head">
          <p className="hero-tag">Available for Adoption</p>
          <h2>Dogs ready to meet their forever families</h2>
          <p>Browse fresh listings and request adoption directly from trusted owners.</p>
        </div>
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

      <section className="section kintamani-testimonials">
        <div className="container section-head convert-head-light">
          <p className="hero-tag">Client Feedback</p>
          <h2>Our Client Testimonial</h2>
          <p>Real feedback from adopters who found their match on PetNest.</p>
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

      <section className="kintamani-cta-band">
        <div className="container kintamani-cta-grid">
          <div>
            <p className="hero-tag">Find Your Dog</p>
            <h2>Dogs Are Not Our Whole Life, but They Make Our Life Whole</h2>
          </div>
          <Link to="/pets" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="section container convert-blog">
        <div className="blog-head-grid convert-head">
          <div>
            <p className="hero-tag">Our News</p>
            <h2>News &amp; Article</h2>
          </div>
          <p>
            Tips and updates for grooming, adoption prep, and helping a new pet settle in comfortably.
          </p>
        </div>

        <motion.div
          className="blog-grid convert-blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {articleCards.map((article) => (
            <motion.article key={article.title} className="blog-article kintamani-article" variants={itemVariants}>
              <div className="kintamani-article-media">
                <img src={article.image} alt={article.title} loading="lazy" />
                <span>{article.category}</span>
              </div>
              <h3>{article.title}</h3>
              <p>Learn more about what makes a safe, prepared, and loving adoption journey work.</p>
              <Link to="/pets" className="learn-link">
                Read More →
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="kintamani-newsletter-band">
        <div className="container kintamani-newsletter">
          <div>
            <p className="hero-tag">Keep Updated</p>
            <h2>Newsletter</h2>
          </div>
          <form className="kintamani-newsletter-form">
            <input type="email" placeholder="Email" aria-label="Email" />
            <button type="button" className="btn btn-outline">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="kintamani-partner-band">
        <motion.div
          className="container convert-partner-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partnerLogos.map((logo) => (
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