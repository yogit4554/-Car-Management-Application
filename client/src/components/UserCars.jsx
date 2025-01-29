import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import api from "../utils/api.js";

const UserCars = ({ cars, fetchUserCars }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cars/${id}`);
      fetchUserCars(); // Re-fetch user cars after deletion
    } catch (error) {
      console.error("Failed to delete car", error);
    }
  };

  const handleUpdate = (id) => {
    // Redirect to the car update page with the car's ID in the URL
    navigate(`/cars/update/${id}`);
  };

  if (!Array.isArray(cars)) {
    return <p>Invalid data format</p>; // Display a fallback message if `cars` is not an array
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.length === 0 ? (
        <p>No cars found</p> // Display message if no cars are available
      ) : (
        cars.map((car) => (
          <div key={car._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Display Car Image */}
            <div className="mb-4">
              {car.images && car.images.length > 0 ? (
                <img
                  src={car.images[0]} // Display first image
                  alt={car.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>

            {/* Display Car Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{car.title}</h3>

            {/* Display Car Tags */}
            <p className="text-sm text-gray-600 mb-4">
              Tags: {car.tags.length ? car.tags.join(", ") : "No tags"}
            </p>

            {/* Update & Delete Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleUpdate(car._id)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserCars;
