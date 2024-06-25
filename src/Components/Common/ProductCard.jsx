import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Cart/cartSlice";
const ProductCard = ({ prod }) => {
  const dispatch = useDispatch();
  const isInCart = useSelector((state) =>
    state.cart.cart.some((item) => item.id === prod.id)
  );
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: prod.id,
        quantity: 1,
        price: prod.price,
        name: prod.title,
        totalPrice: prod.price,
        images: prod.images[0],
      })
    );
  };
  const handleRemoveFromCart = () => {
    dispatch(
      removeFromCart({
        id: prod.id,
        quantity: 1,
        price: prod.price,
        name: prod.title,
        totalPrice: prod.price,
        images: prod.images[0],
      })
    );
  };
  return (
    <div
      style={{ marginTop: "20px", justifyItems: "fit" }}
      className="max-w-xs w-full h-85 rounded shadow-lg bg-white flex flex-col"
    >
      <div className="h-2/3">
        <img className="w-full h-full " src={prod.images[0]} alt="alt" />
      </div>

      <div style={{ margin: "5px" }} className="font-bold text-xl mb-2">
        {prod.title}
      </div>
      <p style={{ margin: "5px" }} className="text-gray-700 text-base">
        {prod.description}
      </p>

      <div>
        <span
          style={{ margin: "5px", alignContent: "center" }}
          className="block text-gray-900 text-lg font-semibold mb-2"
        >
          ${prod.price}
        </span>
        <div>
          {isInCart ? (
            <button
              style={{ marginLeft: "50px" }}
              className="bg-gray-500 hover:bg-red-500 text-white font-bold py-1 px-1 rounded"
              onClick={handleRemoveFromCart}
            >
              Remove from cart
            </button>
          ) : (
            <button
              style={{ marginLeft: "50px" }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
