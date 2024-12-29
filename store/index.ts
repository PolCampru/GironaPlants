import { configureStore } from "@reduxjs/toolkit";
import plantsReducer from "./features/plantsSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    plants: plantsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
