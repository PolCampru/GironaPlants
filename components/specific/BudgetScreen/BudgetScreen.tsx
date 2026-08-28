"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  BudgetContainer,
  BudgetScreenWrapper,
  ContactContainer,
  FlexContainer,
  FormSummaryBand,
} from "./BudgetScreen.style";

import Budget from "../Budget/Budget";
import useBudget from "@/hooks/useBudget";
import useLocale from "@/hooks/useLocale";
import Form from "@/components/ui/Form/Form";
import { formatNumber } from "@/lib/format";
import { plural } from "@/data/budgetContent";
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
    hydrated,
    copy,
    speciesCount,
    unitCount,
    addCostumPlant,
    handleClearCart,
    deleteItem,
    restoreItems,
    handleChangeQuantity,
  } = useBudget();

  const locale = useLocale();

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
            copy={copy}
            hydrated={hydrated}
            speciesCount={speciesCount}
            unitCount={unitCount}
            handleClearCart={handleClearCart}
            deleteItem={deleteItem}
            restoreItems={restoreItems}
            handleChangeQuantity={handleChangeQuantity}
            addCostumPlant={addCostumPlant}
          />
        </BudgetContainer>
        <ContactContainer>
          {items.length > 0 && (
            <FormSummaryBand>
              <FiCheckCircle aria-hidden="true" size={17} />
              <span>
                <strong>
                  {plural(
                    copy.speciesOne,
                    copy.speciesMany,
                    speciesCount,
                    formatNumber(speciesCount, locale)
                  )}
                  {" · "}
                  {plural(
                    copy.unitsOne,
                    copy.unitsMany,
                    unitCount,
                    formatNumber(unitCount, locale)
                  )}
                </strong>{" "}
                {copy.travelWithForm}
              </span>
            </FormSummaryBand>
          )}
          <Form heading={formHeading} content={formContent} />
        </ContactContainer>
      </FlexContainer>
    </BudgetScreenWrapper>
  );
};

export default BudgetScreen;
