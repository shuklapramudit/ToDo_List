import axios from "axios";

// Automatically handles environment URL or Render URL without trailing slash issues
const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://your-render-backend.onrender.com"
).replace(/\/$/, "");

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization Token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;