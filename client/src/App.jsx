import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductListPage from "./pages/ProductListPage";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateCar from "./pages/UpdateCarPage.jsx"; 
import UserCarsPage from "./pages/UserCarsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/get-user-car" element={<UserCarsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cars/update/:id" element={<UpdateCar />} />
      </Routes>
    </Router>
  );
}

export default App;
