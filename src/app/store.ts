import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import shopReducer from '../features/shop/shopSlice';
import adminReducer from '../features/admin/adminSlice';
import booksReducer from '../features/books/booksSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    shop: shopReducer,
    admin: adminReducer,
    books: booksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;