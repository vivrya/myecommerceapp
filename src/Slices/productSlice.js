import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const worker = new Worker("/worker.js");

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      worker.postMessage({ action: "cacheProducts", data: data.products });
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterProducts(state, action) {
      const searchQuery = action.payload;

      state.items = state.originalList.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    setProducts(state, action) {
      console.log("action", action);
      state.items = action.payload;
      state.status = "offline";
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.originalList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        worker.postMessage({ action: "getCachedProducts" });
      });
  },
});

export const { filterProducts, setProducts, setCart } = productsSlice.actions;
export default productsSlice.reducer;
