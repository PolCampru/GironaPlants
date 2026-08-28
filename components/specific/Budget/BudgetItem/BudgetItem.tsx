import { formatPrice } from "@/lib/format";
import useLocale from "@/hooks/useLocale";
import useUiLabels from "@/hooks/useUiLabels";
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
import { FiX } from "react-icons/fi";

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
  const locale = useLocale();
  const labels = useUiLabels();

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
            <p className="old-price">{formatPrice(item.oldPrice, locale)}</p>
            <p className="new-price">{formatPrice(item.newPrice, locale)}</p>
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
      <CloseButton
        type="button"
        onClick={() => deleteItem(item)}
        aria-label={labels.removeFromQuote}
      >
        <FiX aria-hidden="true" size={18} strokeWidth={2.2} />
      </CloseButton>
    </BudgetItemWrapper>
  );
};

export default BudgetItem;
