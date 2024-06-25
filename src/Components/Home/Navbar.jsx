import "../../index.css";
import { Link } from "react-router-dom";

import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyCompany</div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <Link to="/cart">
          <div className="text-white">🛒 Cart</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
