import Plants from "@/components/specific/Plants/Plants";
import { PlantType } from "@/types/Products";
import React from "react";

export default async function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/plants?populate=*&fields[0]=id&fields[1]=genus&fields[2]=description&fields[3]=pot_size&fields[4]=height&fields[5]=price`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  const plants: PlantType[] = data.data ?? [];

  return <Plants data={plants} />;
}
