import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

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
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <section className="section container auth-wrap">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="button" className="btn btn-outline" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
