import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

export const fetchAdminDashboard = createAsyncThunk(
  "admin/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/dashboard");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAdminBooks = createAsyncThunk(
  "admin/fetchAdminBooks",
  async (_, { rejectWithValue }) => {
    try {
      const userRes = await api.get("/users/me");
      const adminId = userRes.data.id;
      const response = await api.get(`/books/?admin_id=${adminId}&limit=50`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
