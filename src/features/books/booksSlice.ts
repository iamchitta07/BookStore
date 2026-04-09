import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import type { BookResponse } from "../../types";

export const fetchBestDeals = createAsyncThunk(
  "books/fetchBestDeals",
  async () => {
    const response = await api.get<BookResponse[]>("/books/best-deals", {
      params: { limit: 10 }
    });
    return response.data;
  }
);

interface BooksState {
  bestDeals: BookResponse[];
  bestDealsLoading: boolean;
  bestDealsError: string | null;
}

const initialState: BooksState = {
  bestDeals: [],
  bestDealsLoading: false,
  bestDealsError: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestDeals.pending, (state) => {
        state.bestDealsLoading = true;
        state.bestDealsError = null;
      })
      .addCase(fetchBestDeals.fulfilled, (state, action) => {
        state.bestDealsLoading = false;
        state.bestDeals = action.payload;
      })
      .addCase(fetchBestDeals.rejected, (state, action) => {
        state.bestDealsLoading = false;
        state.bestDealsError = action.error.message || "Failed to load best deals";
      });
  },
});

export default booksSlice.reducer;
