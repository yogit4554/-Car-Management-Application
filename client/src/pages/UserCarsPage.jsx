import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import Header from "../components/Header";
import UserCars from "../components/UserCars";

const UserCarsPage = () => {
  const [cars, setCars] = useState([]);

  const fetchUserCars = async () => {
    try {
      const response = await api.get("/cars/get-user-car");

      console.log(response); // Log the response to see its structure

      // Check if the success is true and cars data exists
      if (response.data.success && Array.isArray(response.data.message)) {
        setCars(response.data.message); // Assuming the array of cars is in `message`
      } else {
        throw new Error("No cars data found or invalid data structure");
      }
    } catch (error) {
      console.error("Failed to fetch user cars", error.response?.data || error.message);
      alert("Error fetching user cars: " + (error.response?.data?.message || "Unauthorized"));
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={true} />
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold drop-shadow-lg mb-6">My Products</h2>
        <UserCars cars={cars} fetchUserCars={fetchUserCars} />
      </div>
    </div>
  );
};

export default UserCarsPage;
