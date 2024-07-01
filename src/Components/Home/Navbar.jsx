import "../../index.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "../../Slices/productSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    console.log("e.target", e.target.value);
    dispatch(filterProducts(e.target.value));
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  console.log("totalQuantity", totalQuantity);
  return (
    <nav className="bg-gray-800  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyCompany</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <input
              onChange={(e) => handleSearch(e)}
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <Link to="/">
          <div style={{ marginRight: "30px" }} className="text-white">
            Home
          </div>
        </Link>
        <Link to="/cart">
          <div className="text-white">{`🛒 Cart (${totalQuantity})`}</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
