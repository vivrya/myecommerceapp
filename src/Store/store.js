// src/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/cartSlice";
import productsReducer from "../Slices/productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
