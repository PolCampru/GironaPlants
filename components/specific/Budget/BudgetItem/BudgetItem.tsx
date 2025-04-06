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
import Image from "next/image";

interface BudgetItemProps {
  item: ItemType;
  deleteItem: (item: ItemType) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
}

const BudgetItem = ({
  item,
  deleteItem,
  handleChangeQuantity,
}: BudgetItemProps) => {
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
          onChange={(newValue: number) =>
            handleChangeQuantity(item.id, newValue)
          }
          title="Quantitat: "
          error="La quantitat mínima és "
        />
      </ContainerEnd>
      <CloseButton onClick={() => deleteItem(item)}>
        <Image src="/images/crossIcon.svg" alt="Close" />
      </CloseButton>
    </BudgetItemWrapper>
  );
};

export default BudgetItem;
