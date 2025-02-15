"use client";

import React from "react";
import {
  BudgetContainer,
  BudgetScreenWrapper,
  ContactContainer,
  FlexContainer,
  Line,
} from "./BudgetScreen.style";
import Title from "@/components/ui/Title/Title";

import Budget from "../Budget/Budget";
import useBudget from "@/hooks/useBudget";
import Form from "@/components/ui/Form/Form";
import { SpecificBudgetDataType } from "@/types/Budget";

const BudgetScreen = () => {
  const {
    items,
    budgetData,
    handleClearCart,
    deleteItem,
    handleChangeQuantity,
  } = useBudget();

  const specificBudgetData: SpecificBudgetDataType = {
    emptyCard: budgetData.emptyCard,
    emptyState: budgetData.emptyState,
    total: budgetData.total,
    articles: budgetData.articles,
    addPlant1: budgetData.addPlant1,
    addPlant2: budgetData.addPlant2,
  };

  return (
    <BudgetScreenWrapper>
      <Title title={budgetData.title} />
      <Line />
      <FlexContainer>
        <BudgetContainer>
          <Budget
            items={items}
            handleClearCart={handleClearCart}
            deleteItem={deleteItem}
            handleChangeQuantity={handleChangeQuantity}
            data={specificBudgetData}
          />
        </BudgetContainer>
        <ContactContainer>
          <Form />
        </ContactContainer>
      </FlexContainer>
    </BudgetScreenWrapper>
  );
};

export default BudgetScreen;
