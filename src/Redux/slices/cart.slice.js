import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addTodCart: (state, action) => {
        state.cart = [...state.cart, action.payload];
    },
  },
});
export const { addTodCart } = cartSlice.actions;

export default cartSlice;
