import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("petnest_wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("petnest_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (pet) => {
    setWishlist((prev) => {
      if (prev.some((p) => p._id === pet._id)) return prev;
      return [...prev, pet];
    });
  };

  const removeFromWishlist = (petId) => {
    setWishlist((prev) => prev.filter((p) => p._id !== petId));
  };

  const isInWishlist = (petId) => {
    return wishlist.some((p) => p._id === petId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
