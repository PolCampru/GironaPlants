"use client";

import React from "react";
import { formatPrice } from "@/lib/format";
import useLocale from "@/hooks/useLocale";
import { OfferType } from "@/types/Offers";
import {
  Attribute,
  AttributeRow,
  CardBody,
  CardFooter,
  CardMedia,
  DiscountBadge,
  OfferCardWrapper,
  PriceBlock,
} from "./OfferCard.style";
import ImageCarrousel from "../ImageCarrousel/ImageCarrousel";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import useProducts from "@/hooks/useProducts";

const OfferCard = ({ data }: { data: OfferType }) => {
  const { handleAddToCart } = useProducts();
  const locale = useLocale();

  return (
    <OfferCardWrapper>
      {data.discount ? <DiscountBadge>-{data.discount}%</DiscountBadge> : null}

      {data.images?.length > 0 && (
        <CardMedia>
          <ImageCarrousel images={data.images} />
        </CardMedia>
      )}

      <CardBody>
        <h3>{data.genus}</h3>
        <p className="description">{data.description}</p>

        {(data.pot_size || data.height) && (
          <AttributeRow>
            {data.pot_size && <Attribute>{data.pot_size}</Attribute>}
            {data.height && <Attribute>{data.height}</Attribute>}
          </AttributeRow>
        )}

        {data.text && (
          <p className="text" dangerouslySetInnerHTML={{ __html: data.text }} />
        )}
      </CardBody>

      <CardFooter>
        <PriceBlock>
          <span className="new-price">
            {formatPrice(data.new_price, locale)}
          </span>
          {data.old_price ? (
            <span className="old-price">
              {formatPrice(data.old_price, locale)}
            </span>
          ) : null}
        </PriceBlock>

        <AddToCart
          size="2.5rem"
          onClick={() => handleAddToCart({ ...data, id: -data.id }, "offer")}
        />
      </CardFooter>
    </OfferCardWrapper>
  );
};

export default OfferCard;
