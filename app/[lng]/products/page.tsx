import React from "react";
import Plants from "@/components/specific/Plants/Plants";
import { ProductsPageProps } from "@/types/Products";
import { fetchStrapiData } from "@/lib/strapi";

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lng } = await params;

  const url = `offers?locale=${lng}&populate=*&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=discount&fields[5]=quantity&fields[6]=old_price&fields[7]=new_price&fields[8]=text&filters[online][$eq]=true&sort=genus:desc`;

  const offersData = await fetchStrapiData(url);

  return <Plants offersData={offersData} />;
}
