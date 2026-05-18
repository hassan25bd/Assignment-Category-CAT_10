import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">P</span>
          <span>PetNest</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pets">All Pets</NavLink>
          <NavLink to="/dashboard/my-requests">My Requests</NavLink>
          <NavLink to="/dashboard/add-pet">Add Pet</NavLink>
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
