"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { QueryType } from "@/types/Products";
import { FiltersWrapper } from "./AppliedFilters.style";
import FilterTag from "./FilterTag/FilterTag";

interface AppliedFiltersProps {
  filters: QueryType;
  handleRemove: (
    name: keyof QueryType,
    value: string | boolean | Record<number, string>
  ) => void;
  offersLabel: string;
  removeLabel: string;
}

/**
 * Chips for whatever is currently narrowing the table. Renders nothing when
 * no filter is applied — it used to reserve a row and carry an unrelated
 * "add a plant" link, which has moved up to the page header.
 */
const AppliedFilters = ({
  filters,
  handleRemove,
  offersLabel,
  removeLabel,
}: AppliedFiltersProps) => {
  const formatEntries = Object.entries(filters.format ?? {});
  const hasAny = !!filters.search || filters.offers || formatEntries.length > 0;

  if (!hasAny) return null;

  return (
    <FiltersWrapper>
      <AnimatePresence initial={false}>
        {filters.search && (
          <FilterTag
            key="search"
            label={filters.search}
            removeLabel={removeLabel}
            onRemove={() => handleRemove("search", "")}
          />
        )}
        {filters.offers && (
          <FilterTag
            key="offers"
            label={offersLabel}
            removeLabel={removeLabel}
            onRemove={() => handleRemove("offers", false)}
          />
        )}
        {formatEntries.map(([key, value]) => (
          <FilterTag
            key={key}
            label={value}
            removeLabel={removeLabel}
            onRemove={() => handleRemove("format", { [key]: value })}
          />
        ))}
      </AnimatePresence>
    </FiltersWrapper>
  );
};

export default AppliedFilters;
