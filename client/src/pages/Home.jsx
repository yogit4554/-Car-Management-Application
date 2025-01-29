import React, { useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Welcome to Car Management</h2>
        <p className="mt-2">Manage your cars efficiently and effortlessly!</p>
      </div>
    </div>
  );
};

export default Home;
