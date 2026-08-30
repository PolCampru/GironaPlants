import React from "react";
import Plants from "@/components/specific/Plants/Plants";
import { ProductsPageProps } from "@/types/Products";
import { fetchStrapiData } from "@/lib/strapi";

import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";
import { getProductsHeading } from "@/data/pageHeadings";
import GenusDirectory from "@/components/specific/Catalogue/GenusDirectory";
import { getCatalogue, toGenusSummary } from "@/lib/catalogue";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "products");
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { lng } = await params;
  const { search } = await searchParams;

  const url = `offers?locale=${lng}&populate=*&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=discount&fields[5]=quantity&fields[6]=old_price&fields[7]=new_price&fields[8]=text&filters[online][$eq]=true&sort=genus:desc`;

  const offersData = await fetchStrapiData(url);

  // The table above is client-rendered and paginated, so nothing in it is a
  // link a crawler can follow. The A-Z below is the only path into the ~1,100
  // genus and species pages — and getCatalogue() degrades to an empty list
  // rather than taking the catalogue page down with Strapi.
  const catalogue = await getCatalogue();

  return (
    <section>
      <Plants
        offersData={offersData}
        locale={lng}
        heading={getProductsHeading(lng)}
        initialSearch={typeof search === "string" ? search : ""}
      />

      <GenusDirectory
        genera={catalogue.map(toGenusSummary)}
        locale={lng}
      />
    </section>
  );
}
