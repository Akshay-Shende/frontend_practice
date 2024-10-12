"useClient"
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartCount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseCartCount: (state, action) => {
      state.cartCount += 1;
    },
    decreaseCartCount: (state, action) => {
      state.cartCount -= 1;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    }
  },
});

export const { increaseCartCount, decreaseCartCount, setCartCount } = cartSlice.actions;

export default cartSlice.reducer;