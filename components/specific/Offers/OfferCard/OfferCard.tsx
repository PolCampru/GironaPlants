"use client";

import React from "react";
import { OfferType } from "@/types/Offers";
import { OfferCardWrapper } from "./OfferCard.style";
import ImageCarrousel from "../ImageCarrousel/ImageCarrousel";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import useProducts from "@/hooks/useProducts";

const OfferCard = ({ data }: { data: OfferType }) => {
  const { handleAddToCart } = useProducts();

  return (
    <OfferCardWrapper>
      <div className="container-discount">-{data.discount}%</div>

      <div className="container-img-text">
        <ImageCarrousel images={data.images} />

        <div className="container-text">
          <h3 className="gender">{data.genus}</h3>
          <p className="description">{data.description}</p>
          <p className="attributes">{data.pot_size}</p>
          <p className="attributes">{data.height}</p>
          <p className="text" dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
      </div>

      <div className="container-price">
        <p className="new-price">{data.new_price}€</p>
        <p className="old-price">{data.old_price}€</p>
        <AddToCart
          size="2.5rem"
          onClick={() => handleAddToCart({ ...data, id: -data.id })}
        />
      </div>
    </OfferCardWrapper>
  );
};

export default OfferCard;
