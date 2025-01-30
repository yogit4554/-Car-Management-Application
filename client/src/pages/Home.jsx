import React, { useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-600 text-white">
      <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <h2 className="text-4xl font-extrabold drop-shadow-lg">Welcome to Car Management</h2>
        <p className="mt-3 text-lg font-medium max-w-2xl">
          Manage your cars efficiently and effortlessly with our intuitive platform.
        </p>
      </div>
    </div>
  );
};

export default Home;
