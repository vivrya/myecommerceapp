import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./Components/Home/Navbar";
import Header from "./Components/Home/Header";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [productsData, setProductsData] = useState([]);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      setProductsData(data);

      console.log("data here", data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("data", productsData);
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home products={productsData} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
