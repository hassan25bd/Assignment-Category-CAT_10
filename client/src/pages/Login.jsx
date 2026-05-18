import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { isFirebaseConfigured, missingFirebaseEnvKeys } from "../utils/firebase";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Google login failed");
    }
  };

  return (
    <section className="section container auth-wrap">
      <div className="auth-layout auth-layout-vibrant">
        <div className="auth-visual login-visual">
          <p className="auth-kicker">Adoption Member Area</p>
          <h3>Welcome Back</h3>
          <p>Sign in to manage your requests and continue your adoption journey.</p>
          <div className="auth-visual-points">
            <span>Track adoption request status</span>
            <span>Review owner responses</span>
            <span>Plan a safe pickup date</span>
          </div>
        </div>

        <form className="form-card auth-card" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className="auth-subtitle">Continue your path to giving a pet a forever home.</p>
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
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline google-btn"
            onClick={handleGoogleLogin}
            disabled={!isFirebaseConfigured}
            title={!isFirebaseConfigured ? "Configure Firebase env variables in Vercel" : ""}
          >
            Continue with Google
          </button>
          {!isFirebaseConfigured ? (
            <p className="firebase-warning">
              Google login unavailable. Missing: {missingFirebaseEnvKeys.join(", ")}
            </p>
          ) : null}
          <p>
            New here? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
