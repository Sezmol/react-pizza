import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchPizzaItemsArgs {
  currentPage: number;
  limit: number;
  category: number;
}

export interface PizzaItem {
  id: number;
  category: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}

interface PizzaSliceState {
  items: PizzaItem[];
  loading: boolean;
  error: string;
}

const getPizzaItemsUrl = ({
  currentPage,
  limit,
  category,
}: FetchPizzaItemsArgs) => {
  let url = `https://64525b4fbce0b0a0f74460e5.mockapi.io/react-pizza-items?page=${currentPage}&limit=${limit}`;

  if (category > 0) {
    url += `&category=${category}`;
  }

  return url;
};

export const fetchPizzaItems = createAsyncThunk<
  PizzaItem[],
  FetchPizzaItemsArgs
>('pizza/fetchPizzaItems', async ({ currentPage, limit, category }) => {
  const response = await axios.get(
    getPizzaItemsUrl({ currentPage, limit, category })
  );
  return response.data;
});

const initialState: PizzaSliceState = {
  items: [],
  loading: false,
  error: '',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setSortedItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaItems.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        fetchPizzaItems.fulfilled,
        (state, action: PayloadAction<PizzaItem[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchPizzaItems.rejected, (state, action) => {
        state.loading = false;
        if (action.error && action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = 'Неизвестная ошибка';
        }
      });
  },
});

export const { setSortedItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
