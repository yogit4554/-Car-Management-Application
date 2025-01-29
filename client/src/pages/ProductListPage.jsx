import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars/");
        setCars(response.data.data); // Assuming the API response contains `data`
      } catch (error) {
        console.error("Failed to fetch cars", error.response?.data || error.message);
        alert("Error fetching cars: " + error.response?.data?.message || "Unauthorized");
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={true} />
      <div className="container mx-auto py-10 px-6">
        <h2 className="text-4xl font-extrabold text-center drop-shadow-lg">🚘 All Cars</h2>
        <p className="text-lg text-center mt-2 opacity-90">
          Browse through our collection of high-quality cars!
        </p>
        <ProductList cars={cars} />
      </div>
    </div>
  );
};

export default ProductListPage;
