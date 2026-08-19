import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://icodet-backend-production.up.railway.app/api",
});

// 🔐 token auto attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});