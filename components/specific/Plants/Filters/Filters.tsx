import React, { useState } from "react";
import { FiltersWrapper } from "./Filters.style";
import { potSizeOptionsType, QueryType } from "@/types/Products";
import Checkbox from "@/components/ui/CheckBox/CheckBox";
import { motion } from "framer-motion";
import { containerVariants } from "@/animations/Products";

interface FiltersProps {
  data: Record<number, string>;
  options: potSizeOptionsType;
  title: string;
  seeAll: string;
  onChange: (
    name: keyof QueryType,
    value: string | boolean | { [x: number]: string }
  ) => void;
}

const Filters = ({ data, options, title, seeAll, onChange }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const SHOW_TOGGLE_THRESHOLD = 5;
  const canCollapse = options.length > SHOW_TOGGLE_THRESHOLD;

  return (
    <FiltersWrapper $isOpen={canCollapse ? isOpen : true}>
      {canCollapse ? (
        <div className="filters-header" onClick={() => setIsOpen(!isOpen)}>
          <h3>{title}</h3>
          <motion.img
            src="/images/vectorIcon.svg"
            alt="vector"
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ) : (
        <div className="filters-header" style={{ cursor: "default" }}>
          <h3>{title}</h3>
        </div>
      )}

      <motion.div
        className="container-filters"
        variants={canCollapse ? containerVariants : {}}
        animate={canCollapse ? (isOpen ? "expanded" : "collapsed") : "expanded"}
        initial="collapsed"
      >
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.value + " (" + option.label + ")"}
            checked={!!data[option.id]}
            onChange={() => onChange("format", { [option.id]: option.value })}
            name={option.value}
          />
        ))}
      </motion.div>

      {!isOpen && canCollapse && (
        <p onClick={() => setIsOpen(!isOpen)}>{seeAll}</p>
      )}
    </FiltersWrapper>
  );
};

export default Filters;
