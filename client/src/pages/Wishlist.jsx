import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import PetCard from "../components/PetCard";

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();

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

  return (
    <section className="container section">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>My Wishlist ❤️</h2>
            <p>Your saved pets for future reference</p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="btn btn-danger"
              style={{ width: "fit-content" }}
            >
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: "18px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>💔</div>
            <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Your wishlist is empty</h3>
            <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
              Start adding your favorite pets to your wishlist by clicking the heart icon on any pet card.
            </p>
            <Link to="/pets" className="btn btn-primary">
              Explore Pets
            </Link>
          </div>
        ) : (
          <motion.div
            className="pet-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wishlist.map((pet) => (
              <motion.div key={pet._id} variants={itemVariants}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Link to="/pets" className="btn btn-outline">
            Continue Browsing
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Wishlist;
