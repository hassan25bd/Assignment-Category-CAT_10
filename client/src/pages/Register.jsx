import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAfterLogin = location.state?.from || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

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
      setIsSubmitting(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login", { state: { from: redirectAfterLogin }, replace: true });
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      const fallbackMessage = error.request
        ? "Registration failed because the backend is unreachable. Please check the deployed API URL."
        : "Registration failed";
      setSubmitError(backendMessage || fallbackMessage);
    } finally {
      setIsSubmitting(false);
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
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <label>
            Confirm Password
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          {submitError ? <p className="form-error">{submitError}</p> : null}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
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
