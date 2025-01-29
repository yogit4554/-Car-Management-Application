import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ cars }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cars.map((car) => (
        <ProductCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default ProductList;
