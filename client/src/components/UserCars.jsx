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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.length === 0 ? (
        <p>No cars found</p> // Display message if no cars are available
      ) : (
        cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded shadow-md">
            {/* Display Car Image */}
            <div className="mb-4">
              {car.images && car.images.length > 0 ? (
                <img
                  src={car.images[0]} // Display first image
                  alt={car.title}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>

            {/* Display Car Title */}
            <h3 className="text-lg font-bold">{car.title}</h3>

            {/* Display Car Tags */}
            <p className="text-sm text-gray-600 mb-2">
              Tags: {car.tags ? car.tags : "No tags"}
            </p>

            {/* Update & Delete Buttons */}
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleUpdate(car._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
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
