import React from "react";
import {
  AddPlant,
  AddPlantAndContinueWrapper,
  BudgetNavbarWrapper,
} from "./BudgetNavbar.style";
import Title from "@/components/ui/Title/Title";
import Budget from "../../Budget/Budget";
import useBudget from "@/hooks/useBudget";
import useProducts from "@/hooks/useProducts";

const BudgetNavbar = () => {
  const { items, handleClearCart, deleteItem, handleChangeQuantity } =
    useBudget();

  const { dataAddProduct, addCostumPlant } = useProducts();

  return (
    <BudgetNavbarWrapper>
      <Title title="Sol·licitud de pressupost" />
      <Budget
        items={items}
        handleClearCart={handleClearCart}
        deleteItem={deleteItem}
        handleChangeQuantity={handleChangeQuantity}
      />
      <AddPlantAndContinueWrapper>
        <AddPlant>
          {dataAddProduct.question}
          <span onClick={addCostumPlant}>{dataAddProduct.button}</span>
        </AddPlant>
        <button>Formulari de sol·licitud</button>
      </AddPlantAndContinueWrapper>
    </BudgetNavbarWrapper>
  );
};

export default BudgetNavbar;
