import React from "react";
import {
  AboutUsDataType,
  AboutUsPageProps,
  HeroAboutUsProps,
  OurClientsProps,
} from "@/types/AboutUs";
import HeroAboutUs from "@/components/specific/AboutUs/Hero/Hero";
import OurClients from "@/components/specific/AboutUs/OurClients/OurClients";

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { lng } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/about-us?locale=${lng}&populate=*&fields[0]=id&fields[1]=title&fields[2]=subtitle&fields[3]=hero_button&fields[4]=locale&fields[5]=our_clients`;

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

  return (
    <>
      <HeroAboutUs data={heroAboutUsData} />
      <OurClients data={ourClientsData} />
    </>
  );
}
