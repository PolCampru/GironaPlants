"use client";

import { OfferType } from "@/types/Offers";
import React from "react";
import { OffersWrapper } from "./Offers.style";
import Title from "@/components/ui/Title/Title";
import OfferCard from "./OfferCard/OfferCard";
import { useDispatch } from "react-redux";

const Offers = ({ data, lng }: { data: OfferType[]; lng: string }) => {
  let title;
  if (lng === "ca") title = "Ofertes";
  else if (lng === "es") title = "Ofertas";
  else if (lng === "fr") title = "Offres";
  else title = "Offers";

  return (
    <OffersWrapper>
      <Title title={title} />
      <div className="container-offers">
        {data.length > 0 &&
          data.map((offer) => <OfferCard key={offer.id} data={offer} />)}
      </div>
    </OffersWrapper>
  );
};

export default Offers;
