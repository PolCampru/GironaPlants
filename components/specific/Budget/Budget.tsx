import React, { useState } from "react";
import { ItemType } from "@/types/Cart";
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
  handleChangeQuantity: (id: number, quantity: number) => void;
}

const Budget = ({
  items,
  handleClearCart,
  deleteItem,
  handleChangeQuantity,
}: BudgetProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BudgetWrapper>
      <ContainerHeader>
        <Search
          placeholder="Cerca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e)}
        />
        <p onClick={handleClearCart}>Buidar la sol·licitud</p>
      </ContainerHeader>

      {items.length === 0 ? (
        <ContainerItems>No hi ha articles a la sol·licitud</ContainerItems>
      ) : (
        <ContainerItems>
          {filteredItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <BudgetItem
                item={item}
                deleteItem={deleteItem}
                handleChangeQuantity={handleChangeQuantity}
              />
              {index + 1 < filteredItems.length && <Line />}
            </React.Fragment>
          ))}
        </ContainerItems>
      )}

      <p className="total">
        Total: <span>{filteredItems.length} articles</span>
      </p>
    </BudgetWrapper>
  );
};

export default Budget;
