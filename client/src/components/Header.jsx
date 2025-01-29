import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; // Use the global `api` instance
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout"); // Use `api` for the logout request
      setIsLoggedIn(false); // Update the login state
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-extrabold tracking-wide">
        <Link to="/">Car Management</Link>
      </h1>
      <nav className="flex space-x-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-5 py-2 text-lg font-medium bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-lg font-medium bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/products"
              className="px-5 py-2 text-lg font-medium bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Product List
            </Link>
            <Link
              to="/create-product"
              className="px-5 py-2 text-lg font-medium bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Create Product
            </Link>
            <Link
              to="/get-user-car"
              className="px-5 py-2 text-lg font-medium bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              My Products
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-lg font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
