"use client";

import React from "react";
import {
  BudgetContainer,
  BudgetScreenWrapper,
  ContactContainer,
  FlexContainer,
} from "./BudgetScreen.style";

import Budget from "../Budget/Budget";
import useBudget from "@/hooks/useBudget";
import Form from "@/components/ui/Form/Form";
import { SpecificBudgetDataType } from "@/types/Budget";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import type { PageHeading } from "@/data/pageHeadings";
import type { FormType } from "@/types/Contact";

const BudgetScreen = ({
  heading,
  formHeading,
  formContent,
}: {
  heading: PageHeading;
  formHeading: PageHeading;
  formContent: FormType;
}) => {
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
      <SectionHeading
        as="h1"
        label={heading.label}
        title={heading.title}
        lead={heading.lead}
      />
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
          <Form heading={formHeading} content={formContent} />
        </ContactContainer>
      </FlexContainer>
    </BudgetScreenWrapper>
  );
};

export default BudgetScreen;
