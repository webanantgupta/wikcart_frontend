import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

const AddToCart = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Total Price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.unit_price);

    let finalPrice = price;

    if (item.discount) {
      if (item.discount_type === "percentage") {
        finalPrice = price - (price * parseFloat(item.discount)) / 100;
      } else {
        finalPrice = price - parseFloat(item.discount);
      }
    }

    return total + finalPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Cart</h1>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <h2 className="text-2xl font-semibold mb-4">Cart is Empty</h2>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-black text-white rounded-lg"
            >
              Go To Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Products */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const price = parseFloat(item.unit_price);

                const finalPrice =
                  item.discount_type === "percentage"
                    ? price - (price * parseFloat(item.discount || 0)) / 100
                    : price - parseFloat(item.discount || 0);

                const totalItemPrice = finalPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-5 shadow flex gap-5"
                  >
                    {/* Image */}
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                      </svg>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">{item.name}</h2>

                      <p className="text-gray-500 mb-2">{item.brand}</p>

                      <p className="text-gray-600 mb-2">
                        Category: {item.category}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        {/* Decrease */}
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold hover:bg-gray-300"
                        >
                          -
                        </button>

                        {/* Quantity */}
                        <span className="text-xl font-semibold">
                          {item.quantity}
                        </span>

                        {/* Increase */}
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="w-10 h-10 bg-black text-white rounded-lg text-xl font-bold hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mt-4">
                        <p className="text-gray-500">Price Per Item</p>

                        <p className="text-xl font-bold text-green-600">
                          ₹{finalPrice.toFixed(2)}
                        </p>

                        <p className="text-gray-500 mt-2">Total Price</p>

                        <p className="text-2xl font-bold text-green-700">
                          ₹{totalItemPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* Discount */}
                      {item.discount && (
                        <p className="text-red-500 font-medium mt-2">
                          Discount: {item.discount}
                          {item.discount_type === "percentage" ? "%" : "₹"} OFF
                        </p>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            {/* <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Total Items</span>

                <span>
                  {cartItems.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between mb-6">
                <span>Total Price</span>

                <span className="font-bold text-xl">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
            {/* <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                Proceed To Checkout
              </button> */}

            {/* Clear Cart Button */}
            {/* <button
                onClick={() => dispatch(clearCart())}
                className="w-full py-3 mt-4 border border-black rounded-lg hover:bg-gray-100"
              >
                Clear Cart
              </button>  */}
            {/* </div>  */}
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-5 ">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">
                Cart Manifest
              </p>
              <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
              {/* Coupon */}
{/* Cart Items Preview */}
<div className="space-y-4 mb-6">
  {cartItems.map((item) => (
    <div
      key={item.id}
      className="flex items-center gap-3 p-3 border rounded-xl"
    >
      {/* Product Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {item.thumbnail_image ? (
          <img
            src={item.thumbnail_image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {item.name}
        </h3>

        <p className="text-green-600 font-medium">
          ₹{parseFloat(item.unit_price).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 border rounded-full px-2 py-1">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600 hover:text-black"
        >
          -
        </button>

        <span className="font-medium min-w-[20px] text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600 hover:text-black"
        >
          +
        </button>
      </div>
    </div>
  ))}
</div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">
                    Voucher / Code
                  </label>
                  <span className="text-xs text-gray-400">Offers List</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. FAST15"
                    className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium">
                    APPLY
                  </button>
                </div>
              </div>
              {/* Pricing */}
              <div className="space-y-4 border-t border-b py-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-semibold">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>

                  <span className="font-semibold">₹20.00</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-xs uppercase text-gray-400 mb-3">
                  Fulfillment Settlement Protocol
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <button className="border-1 rounded-xl p-1 text-center hover:border-green-500">
                    <p className="font-semibold text-sm">Digital Wallet</p>
                    <p className="text-xs text-gray-400">Pay Now</p>
                  </button>

                  <button className="border-1 rounded-xl p-1 text-center hover:border-green-500">
                    <p className="font-semibold text-sm">Cards / UPI</p>
                    <p className="text-xs text-gray-400">Secure Gateway</p>
                  </button>

                  <button className="border-1 hover:border-green-500 rounded-xl p-1 text-center">
                    <p className="font-semibold text-sm">POD / Cash</p>
                    <p className="text-xs text-gray-400">Pay On Delivery</p>
                  </button>
                </div>
              </div>

              {/* Grand Total */}
              <div className="mt-8 flex justify-between items-center">
                <span className="text-gray-500 uppercase tracking-wider">
                  Grand Total
                </span>

                <span className="text-4xl font-bold text-slate-800">
                  ₹{(totalPrice + 20).toFixed(2)}
                </span>
              </div>

              {/* Checkout */}
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition">
                Initiate Secure Checkout →
              </button>

              {/* Clear Cart */}
              {/* <button
    onClick={() => dispatch(clearCart())}
    className="w-full mt-3 border rounded-xl py-3 hover:bg-gray-50"
  >
    Clear Cart
  </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
