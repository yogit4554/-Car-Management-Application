import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ car }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <img
        src={car.images[0] || "https://via.placeholder.com/150"}
        alt={car.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-bold">{car.title}</h3>
      <p className="text-sm text-gray-600">{car.description}</p>
      <div className="mt-2">
        <Link
          to={`/products/${car._id}`}
          className="text-blue-500 underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
