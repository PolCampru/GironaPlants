import { CartStateType, ItemType } from "@/types/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** The lines the browser has saved. Returns [] anywhere there is no storage. */
const loadCartFromLocalStorage = (): ItemType[] => {
  try {
    if (typeof window === "undefined" || !localStorage) return [];
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) return [];
    const parsed = JSON.parse(serializedCart) as { items?: ItemType[] };
    return Array.isArray(parsed?.items) ? parsed.items : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

/** Only the lines are persisted; `hydrated` is runtime state. */
const saveCartToLocalStorage = (cart: CartStateType) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify({ items: cart.items }));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

/**
 * The store starts EMPTY on both sides.
 *
 * It used to be seeded straight from localStorage, which only exists in the
 * browser: the server rendered zero lines and the client rendered the real
 * quote, so React failed hydration on every page that shows the count (the
 * navbar badge) and threw the /budget tree away to re-render it. `hydrateCart`
 * is dispatched from an effect after mount instead — see CartHydrator.
 */
const initialState: CartStateType = { items: [], hydrated: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Adopts the browser's saved quote. Does not write back: this IS what
     *  localStorage holds. */
    hydrateCart(state, action: PayloadAction<ItemType[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    addItem(state, action: PayloadAction<ItemType>) {
      state.items.push(action.payload);
      state.items.sort((a, b) => a.id - b.id);
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
    clearCart(state) {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { hydrateCart, addItem, removeItem, editQuantity, clearCart } =
  cartSlice.actions;

export { loadCartFromLocalStorage };

export default cartSlice.reducer;
