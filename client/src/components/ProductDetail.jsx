import React from "react";

const ProductDetail = ({ car }) => {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-900">{car.title}</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Car ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-700 leading-relaxed">{car.description}</p>

      {/* Tags */}
      <div className="mt-4">
        <span className="font-semibold text-gray-900">Tags: </span>
        <span className="text-gray-600">{car.tags.join(", ")}</span>
      </div>
    </div>
  );
};

export default ProductDetail;
