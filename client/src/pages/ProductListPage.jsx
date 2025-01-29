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
    <div>
      <Header isLoggedIn={true} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <ProductList cars={cars} />
      </div>
    </div>
  );
};

export default ProductListPage;
