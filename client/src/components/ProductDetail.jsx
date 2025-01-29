import React from "react";

const ProductDetail = ({ car }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{car.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Car ${index + 1}`}
            className="w-full h-40 object-cover"
          />
        ))}
      </div>
      <p className="mt-4 text-gray-700">{car.description}</p>
      <div className="mt-2">
        <span className="font-bold">Tags: </span>
        {car.tags.join(", ")}
      </div>
    </div>
  );
};

export default ProductDetail;
