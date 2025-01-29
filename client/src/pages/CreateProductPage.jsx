import React from "react";
import Header from "../components/Header";
import CreateProduct from "../components/CreateProduct";

const CreateProductPage = () => {
  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Create a New Product</h2>
        <CreateProduct />
      </div>
    </div>
  );
};

export default CreateProductPage;
