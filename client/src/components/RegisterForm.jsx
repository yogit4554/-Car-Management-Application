import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Use the global api instance

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { email, password, fullName }); // Use the api instance for the request
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed", error.response?.data || error.message);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl mb-4">Register</h2>
      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
