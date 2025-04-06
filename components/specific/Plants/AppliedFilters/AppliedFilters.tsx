import { AddProductType, QueryType } from "@/types/Products";
import React from "react";
import {
  AddPlant,
  AppliedFiltersWrapper,
  FiltersWrapper,
} from "./AppliedFilters.style";
import FilterTag from "./FilterTag/FilterTag";
import Loader from "@/components/ui/Loader/Loader";

interface AppliedFiltersProps {
  filters: QueryType;
  dataAddProduct: AddProductType;
  handleRemove: (
    name: keyof QueryType,
    value: string | boolean | Record<number, string>
  ) => void;
  addPlant: () => void;
}

const AppliedFilters = ({
  filters,
  dataAddProduct,
  handleRemove,
  addPlant,
}: AppliedFiltersProps) => {
  if (!dataAddProduct) return <Loader />;
  return (
    <AppliedFiltersWrapper>
      <FiltersWrapper>
        {filters.search && (
          <FilterTag
            label={filters.search}
            onRemove={() => handleRemove("search", "")}
          />
        )}
        {filters.offers && (
          <FilterTag
            label="Ofertes"
            onRemove={() => handleRemove("offers", false)}
          />
        )}
        {filters.format && (
          <>
            {Object.entries(filters.format).map(([key, value]) => (
              <FilterTag
                key={key}
                label={value}
                onRemove={() => handleRemove("format", { [key]: value })}
              />
            ))}
          </>
        )}
      </FiltersWrapper>
      <AddPlant>
        {dataAddProduct.question}{" "}
        <span onClick={addPlant}>{dataAddProduct.button}</span>
      </AddPlant>
    </AppliedFiltersWrapper>
  );
};

export default AppliedFilters;
