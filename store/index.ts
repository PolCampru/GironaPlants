import { configureStore } from "@reduxjs/toolkit";
import plantsReducer from "./features/plantsSlice";
import cartReducer from "./features/cartSlice";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    plants: plantsReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
