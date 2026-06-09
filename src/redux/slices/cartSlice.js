import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const storedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: storedCart
    ? JSON.parse(storedCart)
    : [],
};

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add To Cart
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }

      saveToLocalStorage(state.cartItems);
    },

    // Increase Quantity
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveToLocalStorage(state.cartItems);
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveToLocalStorage(state.cartItems);
    },

    // Remove Item
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveToLocalStorage(state.cartItems);
    },

    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;