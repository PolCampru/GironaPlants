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
import { getAboutUsContent } from "@/data/aboutUsContent";
import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "aboutUs");
}

// Strapi content wins when a field is filled in; otherwise the local
// fallback keeps the page complete.
const text = (value: string | undefined | null, fallback: string) =>
  value && value.trim() ? value : fallback;

export default async function AboutUsPage({
  params,
}: {
  params: AboutUsPageProps;
}) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // No fields[] narrowing — see app/[lng]/page.tsx for the rationale.
  const url = `${baseUrl}/api/strapi/about-us?locale=${lng}&populate=*`;

  let aboutUsData: AboutUsDataType | null = null;
  try {
    const response = await fetch(url);
    const json = await response.json();
    aboutUsData = json.data ?? null;
  } catch {
    aboutUsData = null;
  }

  const fallback = getAboutUsContent(lng);

  const heroAboutUsData: HeroAboutUsProps = {
    hero_images: aboutUsData?.hero_images || [],
    title: text(aboutUsData?.title, fallback.title),
    subtitle: text(aboutUsData?.subtitle, fallback.subtitle),
    hero_button: text(aboutUsData?.hero_button, fallback.hero_button),
    locale: lng,
  };

  const ourClientsData: OurClientsProps = {
    our_clients: aboutUsData?.our_clients?.clients?.length
      ? aboutUsData.our_clients
      : fallback.our_clients,
  };

  const cataloguesData: CataloguesProps = {
    catalogues_title: text(
      aboutUsData?.catalogues_title,
      fallback.catalogues_title
    ),
    catalogues_subtitle: text(
      aboutUsData?.catalogues_subtitle,
      fallback.catalogues_subtitle
    ),
    catalogues_button: text(
      aboutUsData?.catalogues_button,
      fallback.catalogues_button
    ),
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
