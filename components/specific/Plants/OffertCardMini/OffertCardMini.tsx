import React from "react";
import { OfferType } from "@/types/Offers";
import styled from "styled-components";
import ImageCarrousel from "../../Offers/ImageCarrousel/ImageCarrousel";
import AddToCart from "@/components/ui/AddToCart/AddToCart";

export const CardWrapper = styled.div`
  width: 17rem;
  height: 17rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.625rem;
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  .container-discount {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;

    height: 1.2rem;
    padding: 0.1rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.25rem;
    background: ${(props) => props.theme.colors.discountRed};
    color: ${(props) => props.theme.colors.white};
    z-index: 10;
  }

  .genus {
    font-size: 0.75rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .description {
    font-size: 0.9375rem;
    font-weight: 600;
    padding-bottom: 0.25rem;
  }

  .attributes {
    font-size: 0.75rem;
    font-weight: 300;
  }

  .container-price {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  .new-price {
    color: ${(props) => props.theme.colors.discountRed};
    font-size: 0.9375rem;
    font-weight: 600;
  }

  .old-price {
    color: ${(props) => props.theme.colors.mediumGray};
    font-size: 0.75rem;
    font-weight: 300;
    text-decoration: line-through;
  }

  .container-add-to-cart {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;

interface OffertCardMiniProps {
  offer: OfferType;
  handleAddToCart: (product: OfferType) => void;
}

const OffertCardMini = ({ offer, handleAddToCart }: OffertCardMiniProps) => {
  return (
    <CardWrapper>
      <div className="container-discount">-{offer.discount}%</div>
      <ImageCarrousel images={offer.images} />
      <p className="genus">{offer.genus}</p>
      <p className="description">{offer.description}</p>
      <p className="attributes">{offer.pot_size}</p>
      <p className="attributes">{offer.height}</p>
      <div className="container-price">
        <p className="new-price">{offer.new_price}€</p>
        <p className="old-price">{offer.old_price}€</p>
      </div>
      <div className="container-add-to-cart">
        <AddToCart
          size="2rem"
          onClick={() => handleAddToCart({ ...offer, id: -offer.id })}
        />
      </div>
    </CardWrapper>
  );
};

export default OffertCardMini;
