import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);
      
      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { detail: "Login failed" });
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { detail: "Signup failed" });
    }
  }
);
