import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-gray-600 text-white">
      <div className="container mx-auto py-4 text-center">
        <h1 className="text-4xl font-bold mb-4 font-playfair">
          Welcome to My Stop
        </h1>
        <p className="text-lg">
          Your one stop solution for your trendy outfits.
        </p>
      </div>
    </header>
  );
};

export default Header;
