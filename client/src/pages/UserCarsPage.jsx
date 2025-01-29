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
    <div>
      <Header isLoggedIn={true} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Products</h2>
        <UserCars cars={cars} fetchUserCars={fetchUserCars} />
      </div>
    </div>
  );
};

export default UserCarsPage;
