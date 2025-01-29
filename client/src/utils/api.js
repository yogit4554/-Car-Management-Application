import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1", // Corrected environment variable access
  withCredentials: true, // Enables cookies for cross-origin requests
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Get the access token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;