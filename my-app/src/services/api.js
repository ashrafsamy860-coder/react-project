import axios from "axios";

// Base axios instance - swap baseURL with the real API endpoint when available.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.example.com",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("egc_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
