import React from "react";
import { BudgetNavbarWrapper } from "./BudgetNavbar.style";
import Title from "@/components/ui/Title/Title";
import Budget from "../../Budget/Budget";
import useBudget from "@/hooks/useBudget";

const BudgetNavbar = () => {
  const { items, handleClearCart, deleteItem, handleChangeQuantity } =
    useBudget();

  return (
    <BudgetNavbarWrapper>
      <Title title="Sol·licitud de pressupost" />
      <Budget
        items={items}
        handleClearCart={handleClearCart}
        deleteItem={deleteItem}
        handleChangeQuantity={handleChangeQuantity}
      />
      <div style={{ height: "100px" }}>
        Aquí van les plantes Aquí va per afegir una planta Aquí va per continuar
        al formulari de sol·licitud de pressupost
      </div>
    </BudgetNavbarWrapper>
  );
};

export default BudgetNavbar;
