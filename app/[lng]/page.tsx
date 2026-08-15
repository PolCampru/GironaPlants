import Catalogues from "@/components/specific/AboutUs/Catalogues/Catalogues";
import Contact from "@/components/specific/Home/Contact/Contact";
import HeroHome from "@/components/specific/Home/Hero/Hero";
import OurPlants from "@/components/specific/Home/OurPlants/OurPlants";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  getHomeContent,
} from "@/data/homeContent";
import { CataloguesProps } from "@/types/AboutUs";
import {
  HeroHomeProps,
  HomeDataType,
  HomePageProps,
  PlantsHomeProps,
} from "@/types/Home";
import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "home");
}

// Strapi content wins when a field is filled in; otherwise the local
// fallback keeps the page complete.
const text = (value: string | undefined | null, fallback: string) =>
  value && value.trim() ? value : fallback;

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // No fields[] narrowing: the schema may gain fields (hero_badge,
  // trust_items, …) over time and a stale list would either 400 the request
  // or silently hide CMS values behind the local fallbacks.
  const url = `${baseUrl}/api/strapi/home?locale=${lng}&populate=*`;

  let homeData: HomeDataType | null = null;
  try {
    const response = await fetch(url);
    const json = await response.json();
    homeData = json.data ?? null;
  } catch {
    homeData = null;
  }

  const fallback = getHomeContent(lng);

  const heroHomeData: HeroHomeProps = {
    hero_images: homeData?.hero_images || [],
    hero_title: text(homeData?.hero_title, fallback.hero_title),
    hero_subtitle: text(homeData?.hero_subtitle, fallback.hero_subtitle),
    hero_button: text(homeData?.hero_button, fallback.hero_button),
    hero_badge: text(homeData?.hero_badge, fallback.hero_badge),
    hero_secondary_button: text(
      homeData?.hero_secondary_button,
      fallback.hero_secondary_button
    ),
    trust_items: homeData?.trust_items?.length
      ? homeData.trust_items
      : fallback.trust_items,
    locale: lng,
  };

  const plantsHomeData: PlantsHomeProps = {
    plants_title: text(homeData?.plants_title, fallback.plants_title),
    plants_subtitle: text(homeData?.plants_subtitle, fallback.plants_subtitle),
    plants_button: text(homeData?.plants_button, fallback.plants_button),
    locale: lng,
  };

  const cataloguesHomeData: CataloguesProps = {
    catalogues_title: text(
      homeData?.catalogues_title,
      fallback.catalogues_title
    ),
    catalogues_subtitle: text(
      homeData?.catalogues_subtitle,
      fallback.catalogues_subtitle
    ),
    catalogues_button: text(
      homeData?.catalogues_button,
      fallback.catalogues_button
    ),
    locale: lng,
  };

  const contactHomeData = {
    contact_title: text(homeData?.contact_title, fallback.contact_title),
    contact_subtitle: text(
      homeData?.contact_subtitle,
      fallback.contact_subtitle
    ),
    contact_button: text(homeData?.contact_button, fallback.contact_button),
    contact_phone: CONTACT_PHONE,
    contact_email: CONTACT_EMAIL,
    locale: lng,
  };

  return (
    <article>
      <section>
        <HeroHome data={heroHomeData} />
      </section>
      <section>
        <OurPlants data={plantsHomeData} />
      </section>
      <section>
        <Catalogues data={cataloguesHomeData} />
      </section>
      <section>
        <Contact data={contactHomeData} />
      </section>
    </article>
  );
}
