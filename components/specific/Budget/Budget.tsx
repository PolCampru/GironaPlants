"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiLock, FiPlus } from "react-icons/fi";
import { ItemType } from "@/types/Cart";
import { fill, plural, type QuoteCopy } from "@/data/budgetContent";
import { formatNumber } from "@/lib/format";
import useLocale from "@/hooks/useLocale";
import useUiLabels from "@/hooks/useUiLabels";
import Search from "@/components/ui/Search/Search";
import BudgetItem from "./BudgetItem/BudgetItem";
import EmptyQuote from "./EmptyQuote/EmptyQuote";
import {
  AddManuallyButton,
  BudgetWrapper,
  ClearButton,
  Divider,
  HeadActions,
  ItemList,
  KeptLocal,
  NoMatches,
  PanelFooter,
  PanelHead,
  Skeleton,
  Summary,
  UndoBar,
} from "./Budget.style";

interface BudgetProps {
  items: ItemType[];
  copy: QuoteCopy;
  /** The saved quote is adopted one frame after mount; until then an empty
   *  `items` means "not read yet", not "nothing selected". */
  hydrated: boolean;
  speciesCount: number;
  unitCount: number;
  /** "page" is /budget; "drawer" is the navbar slide-over, which is narrower
   *  and carries its own footer and call to action. */
  variant?: "page" | "drawer";
  handleClearCart: () => void;
  deleteItem: (item: ItemType) => void;
  restoreItems: (items: ItemType[]) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
  addCostumPlant: () => void;
  /** Drawer only: close it when a link inside navigates away. */
  onNavigate?: () => void;
}

/** How long the undo bar stays up after a removal. */
const UNDO_TIMEOUT = 10000;

const Budget = ({
  items,
  copy,
  hydrated,
  speciesCount,
  unitCount,
  variant = "page",
  handleClearCart,
  deleteItem,
  restoreItems,
  handleChangeQuantity,
  addCostumPlant,
  onNavigate,
}: BudgetProps) => {
  const locale = useLocale();
  const labels = useUiLabels();
  const [searchTerm, setSearchTerm] = useState("");
  const [undo, setUndo] = useState<{ items: ItemType[]; message: string } | null>(
    null
  );
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDrawer = variant === "drawer";
  const showSearch = !isDrawer && items.length > 0;

  const filteredItems = showSearch
    ? items.filter((item) =>
        `${item.genus} ${item.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : items;

  const offerUndo = (undone: ItemType[], message: string) => {
    if (undoTimer.current) clearTimeout(undoTimer.current);
    setUndo({ items: undone, message });
    undoTimer.current = setTimeout(() => setUndo(null), UNDO_TIMEOUT);
  };

  useEffect(
    () => () => {
      if (undoTimer.current) clearTimeout(undoTimer.current);
    },
    []
  );

  const handleDelete = (item: ItemType) => {
    deleteItem(item);
    offerUndo([item], fill(copy.removed, { name: item.genus }));
  };

  const handleClear = () => {
    const snapshot = items;
    handleClearCart();
    offerUndo(snapshot, copy.cleared);
  };

  const handleUndo = () => {
    if (!undo) return;
    if (undoTimer.current) clearTimeout(undoTimer.current);
    restoreItems(undo.items);
    setUndo(null);
  };

  if (!hydrated) {
    return (
      <BudgetWrapper>
        <Skeleton $compact={isDrawer} aria-hidden="true">
          {[0, 1, 2].map((row) => (
            <div className="row" key={row}>
              <div className="block" />
              <div className="lines">
                <div className="line" />
                <div className="line" />
              </div>
            </div>
          ))}
        </Skeleton>
      </BudgetWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <BudgetWrapper>
        <EmptyQuote
          copy={copy}
          compact={isDrawer}
          onAddManually={addCostumPlant}
          onNavigate={onNavigate}
        />
        {undo && (
          <UndoBar role="status">
            <p>{undo.message}</p>
            <button type="button" onClick={handleUndo}>
              {copy.undo}
            </button>
          </UndoBar>
        )}
      </BudgetWrapper>
    );
  }

  return (
    <BudgetWrapper>
      <PanelHead>
        <Summary>
          <span className="eyebrow">{copy.inRequest}</span>
          <div className="counts">
            <span className="species">
              {plural(
                copy.speciesOne,
                copy.speciesMany,
                speciesCount,
                formatNumber(speciesCount, locale)
              )}
            </span>
            <span className="dot" aria-hidden="true" />
            <span className="units">
              {plural(
                copy.unitsOne,
                copy.unitsMany,
                unitCount,
                formatNumber(unitCount, locale)
              )}
            </span>
          </div>
        </Summary>

        <HeadActions>
          {showSearch && (
            <Search
              placeholder={copy.searchPlaceholder}
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              clearLabel={labels.clearSearch}
            />
          )}
          <ClearButton type="button" onClick={handleClear}>
            {copy.clear}
          </ClearButton>
        </HeadActions>
      </PanelHead>

      {!isDrawer && <Divider />}

      <ItemList $variant={variant}>
        {filteredItems.map((item) => (
          <BudgetItem
            key={item.id}
            item={item}
            copy={copy}
            compact={isDrawer}
            deleteItem={handleDelete}
            handleChangeQuantity={handleChangeQuantity}
          />
        ))}
      </ItemList>

      {filteredItems.length === 0 && <NoMatches>{copy.noMatches}</NoMatches>}

      {undo && (
        <UndoBar role="status">
          <p>{undo.message}</p>
          <button type="button" onClick={handleUndo}>
            {copy.undo}
          </button>
        </UndoBar>
      )}

      {!isDrawer && (
        <>
          <PanelFooter>
            <p>{copy.addQuestion}</p>
            <AddManuallyButton type="button" onClick={addCostumPlant}>
              <FiPlus aria-hidden="true" size={16} />
              {copy.addButton}
            </AddManuallyButton>
          </PanelFooter>

          <KeptLocal>
            <FiLock aria-hidden="true" size={14} />
            {copy.keptLocal}
          </KeptLocal>
        </>
      )}
    </BudgetWrapper>
  );
};

export default Budget;
