"use client";

import React from "react";
import { FilterToggleWrapper, ToggleOption } from "./FilterToggle.style";

interface FilterToggleProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedKey: string;
  label?: string;
}

/** Segmented control. The options are real buttons in a radiogroup now. */
const FilterToggle = ({
  options,
  onChange,
  selectedKey,
  label,
}: FilterToggleProps) => (
  <FilterToggleWrapper role="radiogroup" aria-label={label}>
    {options?.map((option) => (
      <ToggleOption
        key={option.value}
        type="button"
        role="radio"
        aria-checked={selectedKey === option.value}
        $selected={selectedKey === option.value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </ToggleOption>
    ))}
  </FilterToggleWrapper>
);

export default FilterToggle;
