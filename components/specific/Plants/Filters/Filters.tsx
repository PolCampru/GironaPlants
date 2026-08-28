"use client";

import React, { useState } from "react";
import {
  FiltersTitle,
  FiltersWrapper,
  OptionList,
  SeeAllButton,
} from "./Filters.style";
import { potSizeOptionsType, QueryType } from "@/types/Products";
import Checkbox from "@/components/ui/CheckBox/CheckBox";

interface FiltersProps {
  data: Record<number, string>;
  options: potSizeOptionsType;
  title: string;
  seeAll: string;
  onChange: (
    name: keyof QueryType,
    value: string | boolean | Record<number, string>
  ) => void;
}

const VISIBLE_WHEN_COLLAPSED = 5;

const Filters = ({ data, options, title, seeAll, onChange }: FiltersProps) => {
  const [expanded, setExpanded] = useState(false);

  const canCollapse = options.length > VISIBLE_WHEN_COLLAPSED;
  const visible =
    canCollapse && !expanded ? options.slice(0, VISIBLE_WHEN_COLLAPSED) : options;

  return (
    <FiltersWrapper>
      <FiltersTitle>{title}</FiltersTitle>

      {/* The collapsed state now renders fewer options rather than animating
          a max-height on all of them — the old version left the hidden rows
          in the tab order and clipped mid-row. */}
      <OptionList>
        {visible.map((option) => (
          <Checkbox
            key={option.id}
            label={`${option.value} — ${option.label}`}
            checked={!!data[option.id]}
            onChange={() => onChange("format", { [option.id]: option.value })}
            name={option.value}
          />
        ))}
      </OptionList>

      {canCollapse && !expanded && (
        <SeeAllButton type="button" onClick={() => setExpanded(true)}>
          {seeAll}
        </SeeAllButton>
      )}
    </FiltersWrapper>
  );
};

export default Filters;
