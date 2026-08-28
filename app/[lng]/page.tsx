import { Metadata } from "next";
import HeroHome from "@/components/specific/Home/Hero/Hero";
import TrustBand from "@/components/specific/Home/TrustBand/TrustBand";
import OurPlants from "@/components/specific/Home/OurPlants/OurPlants";
import HowWeWork from "@/components/specific/Home/HowWeWork/HowWeWork";
import CataloguesTeaser from "@/components/specific/Home/CataloguesTeaser/CataloguesTeaser";
import Contact from "@/components/specific/Home/Contact/Contact";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  getHomeContent,
} from "@/data/homeContent";
import { PLANT_CATEGORIES, getGenusGloss } from "@/data/plantCategories";
import { getGenusCounts, getTotalReferences } from "@/lib/plants";
import { getCataloguesPage } from "@/lib/catalogues";
import { CataloguesTeaserProps } from "@/types/AboutUs";
import {
  HeroHomeProps,
  HomeDataType,
  HomePageProps,
  HowWeWorkProps,
  PlantsHomeProps,
} from "@/types/Home";
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

const list = <T,>(value: T[] | undefined | null, fallback: T[]): T[] =>
  value && value.length ? value : fallback;

async function getHomeData(lng: string): Promise<HomeDataType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // No fields[] narrowing: the schema gains fields over time and a stale list
  // would either 400 the request or silently hide CMS values behind the local
  // fallbacks.
  try {
    const response = await fetch(
      `${baseUrl}/api/strapi/home?locale=${lng}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;
  const fallback = getHomeContent(lng);

  // Everything the page needs, in parallel — the catalogue cards and the
  // reference counts used to not exist at all, so this must not serialise.
  const [homeData, catalogues, totalReferences, genusCounts] =
    await Promise.all([
      getHomeData(lng),
      getCataloguesPage(lng).catch(() => null),
      getTotalReferences(),
      getGenusCounts(PLANT_CATEGORIES.map((category) => category.genus)),
    ]);

  const numberFormat = new Intl.NumberFormat(
    lng === "en" ? "en-GB" : lng === "fr" ? "fr-FR" : "es-ES"
  );

  const heroHomeData: HeroHomeProps = {
    hero_images: homeData?.hero_images || [],
    hero_title: text(homeData?.hero_title, fallback.hero_title),
    hero_subtitle: text(homeData?.hero_subtitle, fallback.hero_subtitle),
    hero_badge: text(homeData?.hero_badge, fallback.hero_badge),
    hero_secondary_button: text(
      homeData?.hero_secondary_button,
      fallback.hero_secondary_button
    ),
    hero_tag: text(homeData?.hero_tag, fallback.hero_tag),
    hero_image_alt: fallback.hero_image_alt,
    hero_stat: totalReferences
      ? {
          value: numberFormat.format(totalReferences),
          label: fallback.hero_stat_label,
          note: fallback.hero_stat_note,
        }
      : undefined,
    search_placeholder: text(
      homeData?.search_placeholder,
      fallback.search_placeholder
    ),
    search_button: text(homeData?.search_button, fallback.search_button),
    search_suggestions: list(
      homeData?.search_suggestions,
      fallback.search_suggestions
    ),
    search_suggestions_label: fallback.search_suggestions_label,
    locale: lng,
  };

  const plantsHomeData: PlantsHomeProps = {
    plants_title: text(homeData?.plants_title, fallback.plants_title),
    plants_headline: text(homeData?.plants_headline, fallback.plants_headline),
    plants_subtitle: text(homeData?.plants_subtitle, fallback.plants_subtitle),
    plants_button: text(homeData?.plants_button, fallback.plants_button),
    // Resolved on the server. Reading these from i18n inside the client
    // component made the server render zero cards and the client render nine,
    // which threw a hydration error on every home page load.
    categories: PLANT_CATEGORIES.map((category) => {
      const count = genusCounts[category.genus];
      return {
        key: category.genus,
        title: category.genus,
        description:
          count != null
            ? `${numberFormat.format(count)} ${fallback.plants_count_label} · ${getGenusGloss(lng, category.genus)}`
            : getGenusGloss(lng, category.genus),
        img: category.img,
        search: category.genus,
      };
    }),
    ask: {
      title: fallback.ask_title,
      text: fallback.ask_text,
      button: fallback.ask_button,
    },
    locale: lng,
  };

  const howWeWorkData: HowWeWorkProps = {
    label: fallback.how_label,
    title: text(homeData?.how_title, fallback.how_title),
    steps: list(homeData?.how_steps, fallback.how_steps),
  };

  const cataloguesData: CataloguesTeaserProps = {
    catalogues_title: text(
      homeData?.catalogues_title,
      fallback.catalogues_title
    ),
    catalogues_headline: text(
      homeData?.catalogues_headline,
      fallback.catalogues_headline
    ),
    catalogues_subtitle: text(
      homeData?.catalogues_subtitle,
      fallback.catalogues_subtitle
    ),
    catalogues_button: text(
      homeData?.catalogues_button,
      fallback.catalogues_button
    ),
    download_label: fallback.download_label,
    items: catalogues?.items ?? [],
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
    <>
      <HeroHome data={heroHomeData} />
      <TrustBand stats={list(homeData?.stats, fallback.stats)} />
      <OurPlants data={plantsHomeData} />
      <HowWeWork data={howWeWorkData} />
      <CataloguesTeaser data={cataloguesData} />
      <Contact data={contactHomeData} />
    </>
  );
}
