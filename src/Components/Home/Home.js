import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProducts, setCart } from "../../Slices/productSlice";
import ProductCard from "../Common/ProductCard";

const worker = new Worker("/worker.js");

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    worker.onmessage = function (e) {
      const { action, data } = e.data;

      switch (action) {
        case "productsCached":
          console.log("Products successfully cached.");
          break;
        case "retrievedProducts":
          if (data) {
            console.log("Setting retrieved products:", data);
            dispatch(setProducts(data));
          } else {
            console.log("No cached products found.");
          }
          break;
        case "cartUpdated":
          console.log("Cart successfully updated.");
          break;
        case "retrievedCart":
          if (data) {
            console.log("Setting retrieved cart:", data);
            dispatch(setCart(data));
          } else {
            console.log("No cached cart found.");
          }
          break;
        default:
          break;
      }
    };

    if (navigator.onLine) {
      dispatch(fetchProducts());
    } else {
      worker.postMessage({ action: "getCachedProducts" });
      worker.postMessage({ action: "getCart" });
    }
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        width: "95%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginLeft: "40px",
        marginBottom: "30px",
      }}
    >
      {productStatus === "loading" && <div>Loading...</div>}
      {productStatus === "failed" && <div>{error}</div>}
      {productStatus === "succeeded" &&
        products?.map((prod) => {
          return <ProductCard prod={prod} />;
        })}
      {productStatus === "offline" &&
        products?.map((prod) => {
          return <ProductCard prod={prod} />;
        })}
    </div>
  );
};

export default Home;
