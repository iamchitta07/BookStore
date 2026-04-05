import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminDashboard, fetchAdminBooks } from "./adminThunk";

interface AdminState {
  dashboard: any;
  books: any[];
  dashboardLoading: boolean;
  booksLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  dashboard: null,
  books: [],
  dashboardLoading: false,
  booksLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Dashboard
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.dashboardLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action: any) => {
        state.dashboardLoading = false;
        state.error = action.payload || "Failed to fetch dashboard";
      });

    // Books
    builder
      .addCase(fetchAdminBooks.pending, (state) => {
        state.booksLoading = true;
      })
      .addCase(fetchAdminBooks.fulfilled, (state, action) => {
        state.booksLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchAdminBooks.rejected, (state, action: any) => {
        state.booksLoading = false;
        state.error = action.payload || "Failed to fetch books";
      });
  },
});

export default adminSlice.reducer;
