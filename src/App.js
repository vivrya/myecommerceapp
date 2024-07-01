import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Home/Navbar";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Footer from "./Components/Common/Footer";
import Header from "./Components/Home/Header";
import { useSelector } from "react-redux";

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <MainContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
