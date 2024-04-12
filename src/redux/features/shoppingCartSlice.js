import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const isBookExist = state.shoppingCart.find(
        (item) => item._id === action.payload._id
      );
      if (isBookExist) {
        const filter = state.shoppingCart.filter(
          (item) => item._id !== isBookExist._id
        );
        state.shoppingCart = [...filter, action.payload];
      } else {
        state.shoppingCart.push(action.payload);
      }
    },

    // remove from cart
    removeFromCart: (state, action) => {
      const newShoppingCart = state.shoppingCart.filter(
        (item) => item._id !== action.payload
      );
      state.shoppingCart = newShoppingCart;
    },

    // clear cart
    clearCart: (state) => {
      state.shoppingCart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
