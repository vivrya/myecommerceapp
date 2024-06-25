import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const prod = action.payload;
      try {
        const exist = state.cart.find((product) => product.id === prod.id);
        console.log("exist", prod);

        if (exist) {
          exist.quantity++;
          exist.price = prod.price;
          exist.totalPrice += prod.price;

          state.totalPrice += prod.price;
        } else {
          state.cart.push({
            id: prod.id,
            price: prod.price,
            quantity: 1,
            totalPrice: prod.totalPrice,
            name: prod.name,
            images: prod.images,
          });
          state.totalQuantity++;
          state.totalPrice += prod.price;
        }
      } catch (error) {
        return error;
      }
    },
    removeFromCart(state, action) {
      const prod = action.payload;
      try {
        const exist = state.cart.find((product) => product.id === prod.id);
        if (exist) {
          if (exist.quantity === 1) {
            state.cart = state.cart.filter((product) => product.id !== prod.id);
            state.totalPrice =
              state.totalPrice - prod.price < 0
                ? 0
                : state.totalPrice - prod.price;
          } else {
            console.log("test*", prod);
            exist.price = prod.price;
            exist.totalPrice -= prod.price;
            exist.quantity--;
            state.totalPrice = state.totalPrice - prod.price;
          }
        }
      } catch (error) {
        return error;
      }
    },
    isProductInCart: (state, action) => {
      return state.cart.some((item) => item.id === action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart, isProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
