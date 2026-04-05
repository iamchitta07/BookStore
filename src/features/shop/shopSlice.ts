import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

export const fetchShopCounts = createAsyncThunk(
  "shop/fetchShopCounts",
  async () => {
    const [cartRes, wishRes] = await Promise.all([
      api.get("/sales/cart"),
      api.get("/favourites/")
    ]);
    return {
      cartCount: cartRes.data?.items?.length || 0,
      wishlistCount: wishRes.data?.length || 0
    };
  }
);

interface ShopState {
  cartCount: number;
  wishlistCount: number;
}

const initialState: ShopState = {
  cartCount: 0,
  wishlistCount: 0
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShopCounts.fulfilled, (state, action) => {
      state.cartCount = action.payload.cartCount;
      state.wishlistCount = action.payload.wishlistCount;
    });
  }
});

export const { setCartCount, setWishlistCount } = shopSlice.actions;
export default shopSlice.reducer;
