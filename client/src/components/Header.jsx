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
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Car Management</Link> {/* Make logo clickable to navigate to home */}
      </h1>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-blue-500 rounded mr-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-blue-500 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/products"
              className="px-4 py-2 bg-white text-blue-500 rounded mr-2"
            >
              Product List Page
            </Link>
            <Link
              to="/create-product"
              className="px-4 py-2 bg-white text-blue-500 rounded mr-2"
            >
              Product Creation Page
            </Link>
            <Link
              to="/get-user-car"
              className="px-4 py-2 bg-white text-blue-500 rounded mr-2"
            >
              My Products
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
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
