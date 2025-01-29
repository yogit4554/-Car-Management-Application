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
    <div>
      <Header /> {/* ✅ Now Header will always be visible */}
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl mb-4">Register</h2>
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
