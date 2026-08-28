import Offers from "@/components/specific/Offers/Offers";
import { fetchStrapiData } from "@/lib/strapi";
import { OffersPageProps } from "@/types/Offers";
import React from "react";

import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";
import { getOffersHeading } from "@/data/pageHeadings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "offers");
}

const OffersPage = async ({ params }: OffersPageProps) => {
  const { lng } = await params;

  const url = `offers?locale=${lng}&populate=*&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=discount&fields[5]=quantity&fields[6]=old_price&fields[7]=new_price&fields[8]=text&filters[online][$eq]=true&sort=genus:asc`;

  const offersData = await fetchStrapiData(url);

  return (
    <Offers
      data={offersData ?? []}
      lng={lng}
      heading={getOffersHeading(lng)}
    />
  );
};

export default OffersPage;
