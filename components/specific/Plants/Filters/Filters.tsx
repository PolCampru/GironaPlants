import React from "react";
import { FiltersWrapper } from "./Filters.style";
import { potSizeOptionsType, QueryType } from "@/types/Products";
import Checkbox from "@/components/ui/CheckBox/CheckBox";

interface FiltersProps {
  data: Record<number, string>;
  options: potSizeOptionsType;
  title: string;
  onChange: (
    name: keyof QueryType,
    value: string | boolean | { [x: number]: string }
  ) => void;
}

const Filters = ({ data, options, title, onChange }: FiltersProps) => {
  return (
    <FiltersWrapper>
      <h3>{title}</h3>
      <div className="container-filters">
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.value}
            checked={data[option.id] ? true : false}
            onChange={() => onChange("format", { [option.id]: option.value })}
            name={option.value}
          />
        ))}
      </div>
    </FiltersWrapper>
  );
};

export default Filters;
