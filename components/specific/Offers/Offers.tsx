"use client";

import React from "react";
import { OfferType } from "@/types/Offers";
import { OffersGrid, OffersWrapper } from "./Offers.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import OfferCard from "./OfferCard/OfferCard";
import EmptyState from "./EmptyState/EmptyState";
import type { PageHeading } from "@/data/pageHeadings";

const Offers = ({
  data,
  lng,
  heading,
}: {
  data: OfferType[];
  lng: string;
  heading: PageHeading;
}) => (
  // The heading arrives from the server component. It used to be a
  // four-branch if/else on the locale for the title and t() for the rest,
  // which server-rendered the literal string "title".
  <OffersWrapper>
    <SectionHeading
      as="h1"
      label={heading.label}
      title={heading.title}
      lead={heading.lead}
    />

    {data.length === 0 ? (
      <EmptyState lng={lng} />
    ) : (
      <OffersGrid>
        {data.map((offer) => (
          <OfferCard key={offer.id} data={offer} />
        ))}
      </OffersGrid>
    )}
  </OffersWrapper>
);

export default Offers;
