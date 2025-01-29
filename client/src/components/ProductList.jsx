import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {cars.map((car) => (
        <ProductCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default ProductList;
