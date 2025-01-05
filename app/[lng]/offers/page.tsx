import Offers from "@/components/specific/Offers/Offers";
import { OffersPageProps } from "@/types/Offers";
import React from "react";

const OffersPage = async ({ params }: OffersPageProps) => {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/offers?locale=${lng}&populate=*&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=discount&fields[5]=quantity&fields[6]=old_price&fields[7]=new_price&fields[8]=text&filters[online][$eq]=true&sort=genus:desc`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const offersData = await response.json();

  return <Offers data={offersData.data} lng={lng} />;
};

export default OffersPage;
