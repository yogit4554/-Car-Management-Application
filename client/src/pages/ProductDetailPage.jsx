import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.js"; // Import the API instance
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`); // Using the API instance
        setCar(response.data.data); // Assuming the API response has a `data` field
      } catch (error) {
        console.error("Failed to fetch car details", error.response?.data || error.message);
        alert("Error fetching car details. Please try again.");
      }
    };

    fetchCar();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={true} />
      <div className="container mx-auto py-10 px-6">
        {car ? (
          <ProductDetail car={car} />
        ) : (
          <p className="text-center text-xl font-medium">Loading car details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
