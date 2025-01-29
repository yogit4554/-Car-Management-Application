import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js"; // Import the API instance
import Header from "../components/Header"; // ✅ Import Header

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { email, password, fullName }); // Using API instance
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration failed", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header /> {/* ✅ Now Header will always be visible */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <form
          onSubmit={handleRegister}
          className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-96"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-lg text-lg font-medium hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
