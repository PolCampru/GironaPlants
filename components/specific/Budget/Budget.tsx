import React, { useState } from "react";
import { ItemType } from "@/types/Cart";
import {
  BudgetWrapper,
  ContainerHeader,
  ContainerItems,
  EmptyState,
  Line,
} from "./Budget.style";
import Search from "@/components/ui/Search/Search";
import BudgetItem from "./BudgetItem/BudgetItem";
import { SpecificBudgetDataType } from "@/types/Budget";

interface BudgetProps {
  items: ItemType[];
  data: SpecificBudgetDataType;
  handleClearCart: () => void;
  deleteItem: (item: ItemType) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
}

const Budget = ({
  items,
  data,
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
        <p className="empty-cart" onClick={handleClearCart}>
          {data.emptyCard}
        </p>
      </ContainerHeader>

      {items.length === 0 ? (
        <EmptyState>
          <img src="/images/products/emptyState.png" alt="EmptyState" />
          <h3>{data.emptyState}</h3>
        </EmptyState>
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
        {data.total}:{" "}
        <span>
          {filteredItems.length} {data.articles}
        </span>
      </p>
    </BudgetWrapper>
  );
};

export default Budget;
