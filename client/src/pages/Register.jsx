import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAfterLogin = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(formData.password)) {
      return toast.error("Password must include one uppercase letter");
    }
    if (!/[a-z]/.test(formData.password)) {
      return toast.error("Password must include one lowercase letter");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password and confirm password must match");
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
        password: formData.password,
      });
      navigate("/login", { state: { from: redirectAfterLogin }, replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="section container auth-wrap">
      <div className="auth-layout auth-layout-vibrant">
        <div className="auth-visual register-visual">
          <p className="auth-kicker">Start Your Adoption Journey</p>
          <h3>Create Account</h3>
          <p>Join PetNest and connect with verified pets ready for a loving home.</p>
          <div className="auth-visual-points">
            <span>Browse trusted pet profiles</span>
            <span>Submit thoughtful requests</span>
            <span>Adopt with confidence</span>
          </div>
        </div>

        <form className="form-card auth-card" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p className="auth-subtitle">Create your profile and be ready to welcome a companion home.</p>
          <label>
            Name
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label>
            Photo URL
            <input
              required
              value={formData.photoURL}
              onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
