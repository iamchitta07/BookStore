import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

export const fetchShopCounts = createAsyncThunk(
  "shop/fetchShopCounts",
  async () => {
    const [cartRes, wishRes] = await Promise.all([
      api.get("/sales/cart").catch(() => ({ data: { items: [] } })),
      api.get("/favourites/").catch(() => ({ data: [] }))
    ]);

    const wishlistData = wishRes.data || [];
    const map: Record<number, number> = {};
    wishlistData.forEach((fav: any) => {
      map[fav.book_id] = fav.id;
    });

    return {
      cartCount: cartRes.data?.items?.length || 0,
      wishlistCount: wishlistData.length || 0,
      wishlistMap: map,
    };
  }
);

interface ShopState {
  cartCount: number;
  wishlistCount: number;
  wishlistMap: Record<number, number>;
}

const initialState: ShopState = {
  cartCount: 0,
  wishlistCount: 0,
  wishlistMap: {},
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
      state.wishlistMap = action.payload.wishlistMap;
    });
  }
});

export const { setCartCount, setWishlistCount } = shopSlice.actions;
export default shopSlice.reducer;
