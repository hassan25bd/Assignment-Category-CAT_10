import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import PetCard from "../components/PetCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState([]);
  const [sort, setSort] = useState("latest");

  const toggleSpecies = (value) => {
    setSpecies((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (species.length) params.append("species", species.join(","));
        params.append("sort", sort);

        const { data } = await api.get(`/pets?${params.toString()}`);
        setPets(data);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadPets, 300);
    return () => clearTimeout(timer);
  }, [search, species, sort]);

  return (
    <section className="container section">
      <motion.div
        className="all-pets-shell"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="section-head"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2>🐾 All Pets Available</h2>
          <p>Search, filter, and find your perfect companion from our {pets.length} listings.</p>
        </motion.div>

        <motion.div
          className="filters"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by pet name"
            aria-label="Search pets"
          />

          <div className="filter-group">
            {["Dog", "Cat", "Bird", "Rabbit"].map((item) => (
              <label key={item} title={`Filter by ${item}`}>
                <input
                  type="checkbox"
                  checked={species.includes(item)}
                  onChange={() => toggleSpecies(item)}
                  aria-label={`Filter by ${item}`}
                />
                {item}
              </label>
            ))}
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort pets">
            <option value="latest">📅 Latest</option>
            <option value="feeLowHigh">💰 Low to High Fee</option>
            <option value="feeHighLow">💸 High to Low Fee</option>
          </select>
        </motion.div>

        {loading ? (
          <Spinner />
        ) : pets.length > 0 ? (
          <>
            <motion.p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                marginBottom: "20px",
                fontSize: "14px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Found {pets.length} pet{pets.length !== 1 ? "s" : ""} matching your criteria
            </motion.p>
            <motion.div
              className="pet-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {pets.map((pet) => (
                <motion.div key={pet._id} variants={itemVariants}>
                  <PetCard pet={pet} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "var(--card)",
              border: "1px dashed var(--line)",
              borderRadius: "18px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>No pets found</h3>
            <p style={{ color: "var(--muted)" }}>
              Try adjusting your search or filters to find your perfect companion.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AllPets;
