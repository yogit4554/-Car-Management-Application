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
    <div className="grid grid-cols-3 gap-4">
      {cars.length === 0 ? (
        <p>No cars found</p> // Display message if no cars are available
      ) : (
        cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{car.title}</h3>
            <button
              onClick={() => handleUpdate(car._id)} // Call handleUpdate with car's ID
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mr-2"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(car._id)} // Call handleDelete with car's ID
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserCars;
