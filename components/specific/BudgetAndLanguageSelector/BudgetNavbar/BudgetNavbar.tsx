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
import Link from "next/link";

const BudgetNavbar = ({
  lng,
  setHideModal,
}: {
  lng: string;
  setHideModal: (value: boolean) => void;
}) => {
  const { items, handleClearCart, deleteItem, handleChangeQuantity } =
    useBudget();

  const disabled = items.length === 0;

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
      <AddPlantAndContinueWrapper $isDisabled={disabled}>
        <AddPlant>
          {dataAddProduct.question}
          <span onClick={addCostumPlant}>{dataAddProduct.button}</span>
        </AddPlant>
        <Link
          href={`budget`}
          className="link"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
            } else {
              setHideModal(false);
            }
          }}
        >
          Formulari de sol·licitud
        </Link>
      </AddPlantAndContinueWrapper>
    </BudgetNavbarWrapper>
  );
};

export default BudgetNavbar;
