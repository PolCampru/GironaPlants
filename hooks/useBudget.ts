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
import { useTranslation } from "react-i18next";
import { BudgetDataType } from "@/types/Budget";

export default function useBudget() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { t } = useTranslation(["budget"]);
  const budgetData = t("budget", { returnObjects: true }) as BudgetDataType;

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
    budgetData,
    addCostumPlant,
    handleClearCart,
    deleteItem,
    handleChangeQuantity,
  };
}
