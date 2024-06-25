import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log("cartItems", cartItems);
  const handleRemoveFromCart = (prod) => {
    console.log("remove", prod);
    dispatch(
      removeFromCart({
        id: prod.id,
        quantity: 1,
        price: prod.price,
        name: prod.name,
        totalPrice: prod.totalPrice,
        images: prod.images,
      })
    );
  };
  const addToCartHandler = (prod) => {
    console.log("adding", prod);
    dispatch(
      addToCart({
        id: prod.id,
        quantity: 1,
        price: prod.price,
        name: prod.name,
        totalPrice: prod.totalPrice,
        images: prod.images,
      })
    );
  };

  return (
    <div className="container mx-auto py-8">
      {cartItems.cart.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.cart?.map((item, i) => {
              return (
                <div className="cart-items">
                  <div className="cart-item flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <img
                        src={item.images}
                        alt="alt"
                        className="w-12 h-12 rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.totalPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => addToCartHandler(item)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
                      >
                        -
                      </button>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="md:w-1/4 md:ml-8 mt-8 md:mt-0 order-summary p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal:</p>
              <p>${Math.round(cartItems.totalPrice)}</p>
            </div>

            <hr className="my-2" />
            <div className="flex justify-between">
              <h3 className="font-semibold">Total:</h3>
              <h3>${Math.round(cartItems.totalPrice)}</h3>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Looks like your cart is empty. Time to add some items!
        </p>
      )}
    </div>
  );
};

export default Cart;
