import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1", // Corrected environment variable access
  withCredentials: true, // Enables cookies for cross-origin requests
});

export default api;