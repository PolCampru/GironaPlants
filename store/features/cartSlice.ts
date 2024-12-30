import { CartStateType, ItemType } from "@/types/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = (): CartStateType => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) {
      return { items: [] };
    }
    return JSON.parse(serializedCart) as CartStateType;
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return { items: [] };
  }
};

const saveCartToLocalStorage = (cart: CartStateType) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cartItems", serializedCart);
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const initialState: CartStateType = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemType>) {
      state.items.push(action.payload);
      saveCartToLocalStorage(state);
    },
    removeItem(state, action: PayloadAction<ItemType>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(state);
    },
    editQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const { addItem, removeItem, editQuantity } = cartSlice.actions;

export default cartSlice.reducer;
