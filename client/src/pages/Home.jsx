import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import PetCard from "../components/PetCard";
import Spinner from "../components/Spinner";

const showcaseImages = [
  {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    alt: "Happy dog in adoption center",
  },
  {
    src: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1200&q=80",
    alt: "Cute cat portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=1200&q=80",
    alt: "Small bird close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden puppy smiling",
  },
  {
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    alt: "Relaxed cat at home",
  },
  {
    src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
    alt: "Rabbit on grass",
  },
  {
    src: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1200&q=80",
    alt: "Playful brown dog",
  },
  {
    src: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80",
    alt: "White cat with blue eyes",
  },
  {
    src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80",
    alt: "Colorful parrot",
  },
  {
    src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    alt: "Two puppies together",
  },
];

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

const serviceCards = [
  {
    title: "Rescue Locator",
    text: "Find nearby shelters and verified owners to begin safe adoptions.",
    action: "Find Rescues",
    to: "/pets",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Home Readiness",
    text: "Prepare your space with practical guidance before your new companion arrives.",
    action: "Read Checklist",
    to: "/pets",
    image:
      "https://images.unsplash.com/photo-1603123853880-a92fafb7809f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Trusted Profiles",
    text: "Review health, behavior, and owner details before you request adoption.",
    action: "Meet Pets",
    to: "/pets",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80",
  },
];

const staticSections = [
  {
    title: "Why Adopt Pets",
    text: "Adoption saves lives, reduces breeding pressure, and builds meaningful companionship.",
    image:
      "https://images.unsplash.com/photo-1537151764078-4cf2e8f3f2c9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Success Stories",
    text: "Read real journeys from adopters who found loyal friends and joyful homes.",
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pet Care Tips",
    text: "Get practical care guidance on feeding, grooming, and healthy routines.",
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Shelter Spotlight",
    text: "Meet trusted shelters that focus on safe, transparent adoption workflows.",
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Volunteer Opportunities",
    text: "Support local pet welfare through events, fostering, and community outreach.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
  },
];

const partnerLogos = ["Royal Canin", "Petco", "Zoetis", "Merck", "Felix", "Hill's"];

const adoptionPromises = [
  {
    title: "Verified Owner Check",
    text: "Every listing is reviewed for identity and responsible pet care information.",
  },
  {
    title: "Health Transparency",
    text: "Profiles include vaccination and health status for safer adoption decisions.",
  },
  {
    title: "Fair Request Handling",
    text: "Owners manage requests clearly and one approval locks the pet as adopted.",
  },
  {
    title: "Supportive Community",
    text: "Adopters, shelters, and pet owners connect through trusted communication.",
  },
];

const categoryCards = [
  { name: "Dogs", image: "https://images.unsplash.com/photo-1583511655907-d34b81ad4e77?auto=format&fit=crop&w=500&q=80" },
  { name: "Cats", image: "https://images.unsplash.com/photo-1601758064223-638f28fdd8e2?auto=format&fit=crop&w=500&q=80" },
  { name: "Rabbits", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80" },
  { name: "Birds", image: "https://images.unsplash.com/photo-1617083934551-21e757a461c5?auto=format&fit=crop&w=500&q=80" },
  { name: "Seniors", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=500&q=80" },
  { name: "Special Care", image: "https://images.unsplash.com/photo-1613176747384-88969e4fdca6?auto=format&fit=crop&w=500&q=80" },
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
      <section className="top-strip">
        <div className="top-strip-inner">
          <p>ADOPTION WEEK: OPEN HEARTS, OPEN HOMES, OPEN FOREVER BONDS</p>
          <p>ADOPTION WEEK: OPEN HEARTS, OPEN HOMES, OPEN FOREVER BONDS</p>
          <p>ADOPTION WEEK: OPEN HEARTS, OPEN HOMES, OPEN FOREVER BONDS</p>
          <p>ADOPTION WEEK: OPEN HEARTS, OPEN HOMES, OPEN FOREVER BONDS</p>
        </div>
      </section>

      <section className="hero">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hero-tag">PetNest Premium Adoption</p>
            <h1>Find healthy, lovable pets and welcome joy into your home</h1>
            <p>
              Discover dogs, cats, birds, and rabbits from verified owners and shelters. Browse elegant
              profiles, submit requests, and complete safe adoptions with confidence.
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

          <div className="hero-gallery">
            <div className="hero-main-image" />
            <div className="hero-side-image" />
            <div className="hero-review-card">
              <h4>20k+ Customer reviews</h4>
              <p>Families trust PetNest for transparent adoptions and pet care guidance.</p>
              <Link to="/pets" className="btn btn-primary btn-sm">
                View Pets
              </Link>
            </div>
            <p className="hero-credit">Photography from real rescue and companion pet moments.</p>
          </div>
        </div>
      </section>

      <div className="wave-divider wave-light" />

      <section className="section container service-row">
        {serviceCards.map((item) => (
          <article key={item.title} className="service-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to={item.to} className="btn btn-outline btn-sm">
              {item.action}
            </Link>
          </article>
        ))}
      </section>

      <section className="section container creative-banner">
        <div className="creative-banner-copy">
          <p className="hero-tag">Designed for Pet Adoption</p>
          <h2>Not just browsing pets, building forever homes</h2>
          <p>
            PetNest focuses on safe matching, transparent owner communication, and caring pickup
            planning so every adoption starts right.
          </p>
          <div className="hero-actions">
            <Link to="/pets" className="btn btn-primary">
              Meet Pets
            </Link>
            <Link to="/dashboard/my-requests" className="btn btn-outline">
              My Requests
            </Link>
          </div>
        </div>
        <div className="creative-banner-photo" />
      </section>

      <section className="section section-soft">
        <div className="container section-head">
          <h2>Our Adoption Promise</h2>
          <p>Four principles that keep adoptions safe, kind, and reliable.</p>
        </div>
        <div className="container promise-grid">
          {adoptionPromises.map((item, index) => (
            <article key={item.title} className="promise-card">
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
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
        <div className="container section-head">
          <h2>Pet Gallery</h2>
          <p>10 real photos inspired by modern pet-shop style presentation.</p>
        </div>
        <div className="container photo-gallery-grid">
          {showcaseImages.map((item) => (
            <article key={item.src} className="gallery-shot">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      <section className="section category-section">
        <div className="container section-head">
          <h2>Adopt by Companion Type</h2>
          <p>Start your journey by exploring pets that match your lifestyle and home energy.</p>
        </div>
        <div className="container category-grid">
          {categoryCards.map((item) => (
            <article key={item.name} className="category-card">
              <img src={item.image} alt={item.name} loading="lazy" />
              <h4>{item.name}</h4>
              <Link to="/pets" className="btn btn-outline btn-sm">
                View {item.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container static-grid">
          {staticSections.map((item) => (
            <article key={item.title} className="static-photo-card">
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to="/pets" className="btn btn-outline btn-sm">
                Learn More
              </Link>
            </article>
          ))}
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

      <section className="section container spotlight-section">
        <div className="section-head">
          <h2>Rescue Spotlight Wall</h2>
          <p>Creative highlights from pets and families beginning a new chapter.</p>
        </div>
        <div className="spotlight-grid">
          {showcaseImages.slice(0, 4).map((item, index) => (
            <article key={item.src} className="spotlight-item">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div>
                <h4>Spotlight Story {index + 1}</h4>
                <p>Every adopted pet starts with one thoughtful request and one caring family.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft testimonial-section">
        <div className="container section-head">
          <h2>Happy Tails, Real Adoption Stories</h2>
          <p>Families share how PetNest helped them adopt with confidence and care.</p>
        </div>
        <div className="container testimonial-grid">
          <article className="testimonial-card">
            <p>
              We trust PetNest for all our pet needs. Their support team is responsive and every step in
              the adoption process feels safe.
            </p>
            <h4>Stiven Dowson</h4>
            <span>New York, NY</span>
          </article>
          <article className="testimonial-card">
            <p>
              PetNest gave us peace of mind during a tough time. We found the perfect dog and got clear
              care advice from day one.
            </p>
            <h4>Mary Jones</h4>
            <span>Atlanta, GA</span>
          </article>
        </div>
      </section>

      <div className="wave-divider wave-light" />

      <section className="section container blog-section">
        <div className="blog-head-grid">
          <div>
            <p className="hero-tag">Support your pet's health</p>
            <h2>Explore our latest pet care posts</h2>
          </div>
          <p>
            Get practical tips, wellness advice, and care stories that help you support your pet at every
            stage.
          </p>
        </div>

        <div className="blog-grid">
          <article>
            <img
              src="https://images.unsplash.com/photo-1625460822294-9f7d7f3d53cb?auto=format&fit=crop&w=1200&q=80"
              alt="Cat in cozy bed"
            />
            <h3>When to seek professional grooming or veterinary care</h3>
            <Link to="/pets" className="btn btn-outline btn-sm">
              Read More
            </Link>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=1200&q=80"
              alt="Dog eating healthy food"
            />
            <h3>Choosing the right grooming tools for your furry friend</h3>
            <Link to="/pets" className="btn btn-outline btn-sm">
              Read More
            </Link>
          </article>
        </div>
      </section>

      <section className="partner-strip">
        <div className="container partner-grid">
          {partnerLogos.map((logo) => (
            <p key={logo}>{logo}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
