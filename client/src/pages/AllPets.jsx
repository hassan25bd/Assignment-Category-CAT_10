import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import PetCard from "../components/PetCard";

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
        <div className="section-head">
          <h2>All Pets</h2>
          <p>Search, filter, and find your perfect companion.</p>
        </div>

        <div className="filters">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by pet name"
          />

          <div className="filter-group">
            {["Dog", "Cat", "Bird", "Rabbit"].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={species.includes(item)}
                  onChange={() => toggleSpecies(item)}
                />
                {item}
              </label>
            ))}
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="feeLowHigh">Fee Low to High</option>
            <option value="feeHighLow">Fee High to Low</option>
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="pet-grid">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default AllPets;
