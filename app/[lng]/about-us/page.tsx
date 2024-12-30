import React from "react";
import {
  AboutUsDataType,
  AboutUsPageProps,
  CataloguesProps,
  HeroAboutUsProps,
  OurClientsProps,
} from "@/types/AboutUs";
import HeroAboutUs from "@/components/specific/AboutUs/Hero/Hero";
import OurClients from "@/components/specific/AboutUs/OurClients/OurClients";
import Catalogues from "@/components/specific/AboutUs/Catalogues/Catalogues";

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/about-us?locale=${lng}&populate=*&fields[0]=id&fields[1]=title&fields[2]=subtitle&fields[3]=hero_button&fields[4]=locale&fields[5]=our_clients&fields[6]=title_catalogues&fields[7]=subtitle_catalogues&fields[8]=button_catalogues`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const json = await response.json();

  const aboutUsData: AboutUsDataType = json.data;

  const heroAboutUsData: HeroAboutUsProps = {
    hero_images: aboutUsData.hero_images,
    title: aboutUsData.title,
    subtitle: aboutUsData.subtitle,
    hero_button: aboutUsData.hero_button,
    locale: aboutUsData.locale,
  };

  const ourClientsData: OurClientsProps = {
    our_clients: aboutUsData.our_clients,
  };

  const cataloguesData: CataloguesProps = {
    title_catalogues: aboutUsData.title_catalogues,
    subtitle_catalogues: aboutUsData.subtitle_catalogues,
    button_catalogues: aboutUsData.button_catalogues,
    locale: aboutUsData.locale,
  };

  return (
    <>
      <HeroAboutUs data={heroAboutUsData} />
      <OurClients data={ourClientsData} />
      <Catalogues data={cataloguesData} />
    </>
  );
}
