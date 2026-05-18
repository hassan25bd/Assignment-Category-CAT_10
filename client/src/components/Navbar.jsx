import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">P</span>
          <span>PetNest</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/pets" onClick={closeMenu}>
            All Pets
          </NavLink>
          <NavLink to="/wishlist" onClick={closeMenu}>
            ❤️ Wishlist
          </NavLink>
          <NavLink to="/dashboard/my-requests" onClick={closeMenu}>
            My Requests
          </NavLink>
          <NavLink to="/dashboard/add-pet" onClick={closeMenu}>
            Add Pet
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === "light" ? "Dark" : "Light"}
          </button>
          {user ? (
            <details className="profile-menu">
              <summary>
                <img
                  src={user.photoURL || "https://i.ibb.co/8gL5Pvb/default-avatar.png"}
                  alt={user.name || "Profile"}
                />
                <span>{user.name || "Profile"}</span>
              </summary>
              <div className="dropdown">
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={logout} type="button">
                  Logout
                </button>
              </div>
            </details>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
