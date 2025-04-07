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

export const metadata = {
  title: "GironaPlants About Us",
  description: "Welcome to the about us page",
};

export default async function AboutUsPage({
  params,
}: {
  params: AboutUsPageProps;
}) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/about-us?locale=${lng}&populate=*&fields[0]=id&fields[1]=title&fields[2]=subtitle&fields[3]=hero_button&fields[4]=locale&fields[5]=our_clients&fields[6]=catalogues_title&fields[7]=catalogues_subtitle&fields[8]=catalogues_button`;

  const response = await fetch(url);

  const json = await response.json();

  const aboutUsData: AboutUsDataType = json.data;

  if (!aboutUsData) {
    return null;
  }

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
    catalogues_title: aboutUsData.catalogues_title,
    catalogues_subtitle: aboutUsData.catalogues_subtitle,
    catalogues_button: aboutUsData.catalogues_button,
    locale: lng,
  };

  return (
    <>
      <section>
        <HeroAboutUs data={heroAboutUsData} />
      </section>
      <section>
        <OurClients data={ourClientsData} />
      </section>
      <section>
        <Catalogues data={cataloguesData} />
      </section>
    </>
  );
}
