import { ItemType } from "@/types/Cart";
import React from "react";
import {
  BudgetWrapper,
  ContainerHeader,
  ContainerItems,
  Line,
} from "./Budget.style";
import Search from "@/components/ui/Search/Search";
import BudgetItem from "./BudgetItem/BudgetItem";

interface BudgetProps {
  items: ItemType[];
  handleClearCart: () => void;
  deleteItem: (item: ItemType) => void;
}

const Budget = ({ items, handleClearCart, deleteItem }: BudgetProps) => {
  return (
    <BudgetWrapper>
      <ContainerHeader>
        <Search
          placeholder="Cerca..."
          value=""
          onChange={() => console.log("search")}
        />
        <p onClick={handleClearCart}>Buidar la sol·licitud</p>
      </ContainerHeader>
      <ContainerItems>
        {items.map((item, index) => (
          <>
            <BudgetItem key={item.id} item={item} deleteItem={deleteItem} />
            {index + 1 < items.length && <Line />}
          </>
        ))}
      </ContainerItems>
    </BudgetWrapper>
  );
};

export default Budget;
