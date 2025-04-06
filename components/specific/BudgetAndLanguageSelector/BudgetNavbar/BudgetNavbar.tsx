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
import { SpecificBudgetDataType } from "@/types/Budget";

const BudgetNavbar = ({
  setHideModal,
}: {
  setHideModal: (value: boolean) => void;
}) => {
  const {
    items,
    budgetData,
    handleClearCart,
    deleteItem,
    handleChangeQuantity,
  } = useBudget();

  const disabled = items.length === 0;

  const { dataAddProduct, addCostumPlant } = useProducts();

  const specificBudgetData: SpecificBudgetDataType = {
    emptyCard: budgetData.emptyCard,
    emptyState: budgetData.emptyState,
    total: budgetData.total,
    articles: budgetData.articles,
    addPlant1: budgetData.addPlant1,
    addPlant2: budgetData.addPlant2,
  };

  return (
    <BudgetNavbarWrapper>
      <Title title={budgetData.title} />
      <Budget
        items={items}
        handleClearCart={handleClearCart}
        deleteItem={deleteItem}
        handleChangeQuantity={handleChangeQuantity}
        data={specificBudgetData}
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
          {budgetData.button}
        </Link>
      </AddPlantAndContinueWrapper>
    </BudgetNavbarWrapper>
  );
};

export default BudgetNavbar;
