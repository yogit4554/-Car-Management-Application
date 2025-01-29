import React from "react";
import Header from "../components/Header";
import CreateProduct from "../components/CreateProduct";

const CreateProductPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={true} />
      <div className="flex flex-col items-center justify-center py-10 px-6">
        <h2 className="text-4xl font-extrabold drop-shadow-lg mb-6">Create a New Product</h2>
        <CreateProduct />
      </div>
    </div>
  );
};

export default CreateProductPage;
