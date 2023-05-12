import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzaItems = createAsyncThunk(
  'pizza/fetchPizzaItems',
  async ({ currentPage, limit }) => {
    const response = await axios.get(
      `https://64525b4fbce0b0a0f74460e5.mockapi.io/react-pizza-items?page=${currentPage}&limit=${limit}`
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSortedItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzaItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPizzaItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortedItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
