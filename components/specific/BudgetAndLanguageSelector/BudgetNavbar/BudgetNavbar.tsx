"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Budget from "../../Budget/Budget";
import useBudget from "@/hooks/useBudget";
import useLocale from "@/hooks/useLocale";
import { navHref } from "@/data/navigation";
import { formatNumber } from "@/lib/format";
import { plural } from "@/data/budgetContent";
import {
  AddManually,
  ContinueDisabled,
  ContinueLink,
  DrawerFooter,
  DrawerLayout,
  DrawerScroll,
} from "./BudgetNavbar.style";

const BudgetNavbar = ({
  setHideModal,
}: {
  setHideModal: (value: boolean) => void;
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
  const isEmpty = items.length === 0;

  const totals = `${plural(
    copy.speciesOne,
    copy.speciesMany,
    speciesCount,
    formatNumber(speciesCount, locale)
  )} · ${plural(
    copy.unitsOne,
    copy.unitsMany,
    unitCount,
    formatNumber(unitCount, locale)
  )}`;

  return (
    <DrawerLayout>
      <DrawerScroll>
        <Budget
          variant="drawer"
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
          onNavigate={() => setHideModal(false)}
        />
      </DrawerScroll>

      <DrawerFooter>
        {!isEmpty && (
          <div className="totals">
            <strong>{totals}</strong>
            <span>{copy.pricedIn}</span>
          </div>
        )}

        {isEmpty ? (
          <ContinueDisabled type="button" disabled>
            {copy.drawerCta}
          </ContinueDisabled>
        ) : (
          // Was href="budget" — a relative href, so from /en/products it
          // resolved to /en/products/budget.
          <ContinueLink
            href={navHref(locale, "budget")}
            onClick={() => setHideModal(false)}
          >
            {copy.drawerCta}
            <FiArrowRight aria-hidden="true" size={17} />
          </ContinueLink>
        )}

        <AddManually>
          {copy.addQuestion}
          <button type="button" onClick={addCostumPlant}>
            {copy.addButton}
          </button>
        </AddManually>
      </DrawerFooter>
    </DrawerLayout>
  );
};

export default BudgetNavbar;
