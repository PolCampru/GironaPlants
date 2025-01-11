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

const BudgetScreen = () => {
  const { items, handleClearCart, deleteItem, handleChangeQuantity } =
    useBudget();

  return (
    <BudgetScreenWrapper>
      <Title title="Sol·licitud de pressupost" />
      <Line />
      <FlexContainer>
        <BudgetContainer>
          <Budget
            items={items}
            handleClearCart={handleClearCart}
            deleteItem={deleteItem}
            handleChangeQuantity={handleChangeQuantity}
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
