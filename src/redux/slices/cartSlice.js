import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    increaseAmount(state, action) {
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload
      );

      itemToUpdate.amount += 1;
      itemToUpdate.totalPrice += itemToUpdate.unitPrice;
    },
    decreaseAmount(state, action) {
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload
      );

      if (itemToUpdate.amount > 1) {
        itemToUpdate.amount -= 1;
        itemToUpdate.totalPrice -= itemToUpdate.unitPrice;
      } else
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearAllCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseAmount,
  decreaseAmount,
  removeFromCart,
  clearAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
