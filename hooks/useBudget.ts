"use client";

import { RootState } from "@/store";

import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItem,
  editQuantity,
} from "@/store/features/cartSlice";
import { showModal } from "@/store/features/modalSlice";
import { ItemType } from "@/types/Cart";

export default function useBudget() {
  const { items } = useSelector((state: RootState) => state.cart);

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

  const handleChangeQuantity = (id: number, quantity: number) => {
    dispatch(editQuantity({ id, quantity }));
  };

  return {
    items,
    addCostumPlant,
    handleClearCart,
    deleteItem,
    handleChangeQuantity,
  };
}
