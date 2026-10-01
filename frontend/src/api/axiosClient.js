// frontend/src/api/axiosClient.js
import axios from "axios";

const getBaseUrl = () => {
  // 1. Explicit build-time or runtime environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined" && window.__ENV__?.VITE_API_URL) {
    return window.__ENV__.VITE_API_URL;
  }

  // 2. Production fallback on Render/cloud (any non-localhost host)
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "https://library-management-6-fm67.onrender.com/api";
  }

  // 3. Local development fallback
  return "/api";
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
