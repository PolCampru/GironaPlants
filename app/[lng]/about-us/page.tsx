import React from "react";
import { Metadata } from "next";
import {
  AboutUsDataType,
  AboutUsPageProps,
  CataloguesTeaserProps,
  HeroAboutUsProps,
  OurClientsProps,
} from "@/types/AboutUs";
import HeroAboutUs from "@/components/specific/AboutUs/Hero/Hero";
import Stats from "@/components/specific/AboutUs/Stats/Stats";
import OurClients from "@/components/specific/AboutUs/OurClients/OurClients";
import CataloguesTeaser from "@/components/specific/Home/CataloguesTeaser/CataloguesTeaser";
import Contact from "@/components/specific/Home/Contact/Contact";
import { getAboutUsContent } from "@/data/aboutUsContent";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  getHomeContent,
} from "@/data/homeContent";
import { getCataloguesPage } from "@/lib/catalogues";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "aboutUs");
}

const text = (value: string | undefined | null, fallback: string) =>
  value && value.trim() ? value : fallback;

const list = <T,>(value: T[] | undefined | null, fallback: T[]): T[] =>
  value && value.length ? value : fallback;

async function getAboutUsData(lng: string): Promise<AboutUsDataType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(
      `${baseUrl}/api/strapi/about-us?locale=${lng}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function AboutUsPage({
  params,
}: {
  params: AboutUsPageProps;
}) {
  const { lng } = await params;
  const fallback = getAboutUsContent(lng);
  const homeFallback = getHomeContent(lng);

  const [aboutUsData, catalogues] = await Promise.all([
    getAboutUsData(lng),
    getCataloguesPage(lng).catch(() => null),
  ]);

  const heroAboutUsData: HeroAboutUsProps = {
    hero_images: aboutUsData?.hero_images || [],
    label: text(aboutUsData?.label, fallback.label),
    title: text(aboutUsData?.title, fallback.title),
    subtitle: text(aboutUsData?.subtitle, fallback.subtitle),
    hero_button: text(aboutUsData?.hero_button, fallback.hero_button),
    hero_secondary_button: text(
      aboutUsData?.hero_secondary_button,
      fallback.hero_secondary_button
    ),
    founded: fallback.founded,
    locale: lng,
  };

  const cmsClients = aboutUsData?.our_clients;
  const ourClientsData: OurClientsProps = {
    our_clients: {
      title: text(cmsClients?.title, fallback.our_clients.title),
      headline: text(cmsClients?.headline, fallback.our_clients.headline),
      subtitle: text(cmsClients?.subtitle, fallback.our_clients.subtitle),
      clients: list(cmsClients?.clients, fallback.our_clients.clients),
    },
  };

  const cataloguesData: CataloguesTeaserProps = {
    catalogues_title: text(
      aboutUsData?.catalogues_title,
      fallback.catalogues_title
    ),
    catalogues_headline: text(
      aboutUsData?.catalogues_headline,
      fallback.catalogues_headline
    ),
    catalogues_subtitle: text(
      aboutUsData?.catalogues_subtitle,
      fallback.catalogues_subtitle
    ),
    catalogues_button: text(
      aboutUsData?.catalogues_button,
      fallback.catalogues_button
    ),
    download_label: homeFallback.download_label,
    items: catalogues?.items ?? [],
    locale: lng,
  };

  return (
    <>
      <HeroAboutUs data={heroAboutUsData} />
      <Stats stats={list(aboutUsData?.stats, fallback.stats)} />
      <OurClients data={ourClientsData} />
      <CataloguesTeaser data={cataloguesData} />
      <Contact
        data={{
          contact_title: homeFallback.contact_title,
          contact_subtitle: homeFallback.contact_subtitle,
          contact_button: homeFallback.contact_button,
          contact_phone: CONTACT_PHONE,
          contact_email: CONTACT_EMAIL,
          locale: lng,
        }}
      />
    </>
  );
}
