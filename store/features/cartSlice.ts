import { CartStateType, ItemType } from "@/types/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartStateType = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemType>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<ItemType>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    editQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
