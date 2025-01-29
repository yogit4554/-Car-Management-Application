import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Backend URL
  withCredentials: true, // For cookies
});

export default api;