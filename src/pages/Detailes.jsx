import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // product data coming from navigate state
  const product = location.state;

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    navigate("/addtocart");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            No Product Found
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Final Price Calculation
  const getFinalPrice = () => {
    const price = parseFloat(product.unit_price);

    if (!product.discount) return price;

    if (product.discount_type === "percentage") {
      return (
        price -
        (price * parseFloat(product.discount)) / 100
      );
    }

    return price - parseFloat(product.discount);
  };

  const finalPrice = getFinalPrice();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
          <svg
            className="w-40 h-40 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description ||
              "No description available"}
          </p>

          <div className="space-y-3">
            <p className="text-lg">
              <span className="font-semibold">
                Brand:
              </span>{" "}
              {product.brand || "N/A"}
            </p>

            <p className="text-lg">
              <span className="font-semibold">
                Category:
              </span>{" "}
              {product.category || "N/A"}
            </p>

            <p className="text-lg">
              <span className="font-semibold">
                Stock:
              </span>{" "}
              {product.current_stock}
            </p>

            <p className="text-lg">
              <span className="font-semibold">
                Price:
              </span>{" "}
              <span className="text-green-600 font-bold">
                ₹{finalPrice.toFixed(2)}
              </span>
            </p>

            {product.discount && (
              <p className="text-red-500 font-semibold">
                Discount: {product.discount}
                {product.discount_type === "percentage"
                  ? "%"
                  : "₹"}{" "}
                OFF
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              Add To Cart
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-black rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;