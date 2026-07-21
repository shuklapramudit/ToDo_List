import axios from "axios";

// Environment Variable se Backend Base URL fetch karega
const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://todo-list-b66a.onrender.com"
).replace(/\/$/, "");

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatic Bearer Token Interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;