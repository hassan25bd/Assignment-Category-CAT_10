import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { signInWithPopup, signOut } from "firebase/auth";
import api from "../utils/api";
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
} from "../utils/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const register = async (payload) => {
    await api.post("/auth/register", payload);
    toast.success("Registration successful");
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    setUser(data.user);
    toast.success("Welcome back");
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error("Google login is unavailable right now. Please use email and password login.");
    }

    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    const { data } = await api.post("/auth/google", { idToken });
    setUser(data.user);
    toast.success("Google login successful");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    toast.success("Logged out");
  };

  const value = useMemo(
    () => ({ user, loading, register, login, loginWithGoogle, logout, refreshUser: getCurrentUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
