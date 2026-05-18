import axios from "axios";

const productionApiUrl = "https://pet-adoption-platform-api.onrender.com";
const isLocalhost =
  typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isLocalhost ? "http://localhost:5000" : productionApiUrl),
  withCredentials: true,
});

export default api;
