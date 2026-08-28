import { CatalogueItem } from "./Catalogues";

export type HomePageProps = {
  params: Promise<{
    lng: string;
  }>;
};

export type ImageType = {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
};

/** One figure in the trust band under the hero. */
export type StatType = {
  value: string;
  label: string;
};

/** One card in the "our plants" grid. */
export type PlantCategoryType = {
  key: string;
  title: string;
  description?: string;
  img?: string;
  /** Term pushed into the products search when the card is clicked. */
  search?: string;
};

export type HeroHomeProps = {
  hero_images: ImageType[];
  hero_title: string;
  hero_subtitle: string;
  hero_badge?: string;
  hero_secondary_button?: string;
  hero_image_alt: string;
  hero_tag?: string;
  hero_stat?: { value: string; label: string; note?: string };
  search_placeholder: string;
  search_button: string;
  search_suggestions?: string[];
  search_suggestions_label?: string;
  locale: string;
};

export type PlantsHomeProps = {
  /** Eyebrow above the headline. */
  plants_title: string;
  plants_headline: string;
  plants_subtitle: string;
  plants_button: string;
  categories: PlantCategoryType[];
  ask?: { title: string; text: string; button: string };
  locale: string;
};

export type HowWeWorkProps = {
  label: string;
  title: string;
  steps: { title: string; text: string }[];
};

export type ContactHomeProps = {
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
  contact_phone?: string;
  contact_email?: string;
  locale: string;
};

/** Raw shape of the `home` single type as Strapi serves it. */
export type HomeDataType = {
  hero_badge?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_button?: string;
  hero_secondary_button?: string;
  hero_images?: ImageType[];
  hero_tag?: string;
  search_placeholder?: string;
  search_button?: string;
  search_suggestions?: string[];
  stats?: StatType[];
  plants_title?: string;
  plants_headline?: string;
  plants_subtitle?: string;
  plants_button?: string;
  how_title?: string;
  how_steps?: { title: string; text: string }[];
  catalogues_title?: string;
  catalogues_headline?: string;
  catalogues_subtitle?: string;
  catalogues_button?: string;
  contact_title?: string;
  contact_subtitle?: string;
  contact_button?: string;
};

export type CataloguesTeaserData = {
  items: CatalogueItem[];
};
