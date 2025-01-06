import { ItemType } from "@/types/Cart";
import React from "react";
import {
  BudgetItemWrapper,
  CloseButton,
  ContainerEnd,
  ContainerImgText,
} from "./BudgetItem.style";
import ImageCarrousel from "../../Offers/ImageCarrousel/ImageCarrousel";
import Quantity from "./Quantity/Quantity";

interface BudgetItemProps {
  item: ItemType;
  deleteItem: (item: ItemType) => void;
}

const BudgetItem = ({ item, deleteItem }: BudgetItemProps) => {
  console.log(item.image);
  return (
    <BudgetItemWrapper>
      <ContainerImgText>
        {item.image && (
          <div className="container-carrusel">
            <ImageCarrousel images={item.image} />
            <p className="discount">-{item.discount}%</p>
          </div>
        )}
        <div className="container-info">
          <h3>{item.genus}</h3>
          <p>{item.description}</p>
          <p>{item.pot_size}</p>
          <p>{item.height}</p>
        </div>
      </ContainerImgText>
      <ContainerEnd>
        {item.newPrice && item.oldPrice && (
          <div className="container-price">
            <p className="old-price">{item.oldPrice}€</p>
            <p className="new-price">{item.newPrice}€</p>
          </div>
        )}
        <Quantity
          minQuantity={item.min_quantity}
          value={item.quantity}
          onChange={() => console.log("change")}
        />
      </ContainerEnd>
      <CloseButton onClick={() => deleteItem(item)}>
        <img src="/images/crossIcon.svg" alt="Close" />
      </CloseButton>
    </BudgetItemWrapper>
  );
};

export default BudgetItem;
