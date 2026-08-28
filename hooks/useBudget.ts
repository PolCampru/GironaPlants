"use client";

import { RootState } from "@/store";

import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
  editQuantity,
} from "@/store/features/cartSlice";
import { showModal } from "@/store/features/modalSlice";
import { ItemType } from "@/types/Cart";
import { getQuoteCopy, type QuoteCopy } from "@/data/budgetContent";
import useLocale from "./useLocale";

export default function useBudget() {
  const { items, hydrated } = useSelector((state: RootState) => state.cart);
  // Copy comes from data/, not runtime i18n: the drawer and /budget are both
  // in the server HTML, where i18n resolves nothing.
  const copy: QuoteCopy = getQuoteCopy(useLocale());

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addCostumPlant = () => {
    dispatch(showModal("addPlant"));
  };

  const deleteItem = (item: ItemType) => {
    dispatch(removeItem(item));
  };

  /** Undo for a removal or a cleared request. addItem re-sorts by id, so a
   *  restored line lands back in its own place. A line the visitor re-added
   *  from the catalogue in the meantime is not duplicated — its quantity is
   *  put back instead, so undo never silently does nothing. */
  const restoreItems = (restored: ItemType[]) => {
    const present = new Set(items.map((item) => item.id));
    restored.forEach((item) => {
      if (present.has(item.id)) {
        dispatch(editQuantity({ id: item.id, quantity: item.quantity }));
      } else {
        dispatch(addItem(item));
      }
    });
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    dispatch(editQuantity({ id, quantity }));
  };

  /** Species, and the unit total we actually quote on. */
  const speciesCount = items.length;
  const unitCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return {
    items,
    /** False for the first client render, which has to match the server's. */
    hydrated,
    copy,
    speciesCount,
    unitCount,
    addCostumPlant,
    handleClearCart,
    deleteItem,
    restoreItems,
    handleChangeQuantity,
  };
}
