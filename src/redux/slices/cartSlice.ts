import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getItemsFromLS } from '../../utils/getItemsFromLS';

export interface ICartItem {
  amount: number;
  imageUrl: string;
  size: number;
  title: string;
  totalPrice: number;
  type: string;
  id: string;
  unitPrice: number;
}

interface CartSliceState {
  items: ICartItem[];
}

const initialState: CartSliceState = {
  items: getItemsFromLS(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      state.items.push(action.payload);
    },
    increaseAmount(state, action: PayloadAction<string>) {
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToUpdate) {
        itemToUpdate.amount += 1;
        itemToUpdate.totalPrice += itemToUpdate.unitPrice;
      }
    },
    decreaseAmount(state, action: PayloadAction<string>) {
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload
      );

      if (itemToUpdate) {
        if (itemToUpdate.amount > 1) {
          itemToUpdate.amount -= 1;
          itemToUpdate.totalPrice -= itemToUpdate.unitPrice;
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
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
