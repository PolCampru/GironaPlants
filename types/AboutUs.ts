import { CatalogueItem } from "./Catalogues";
import { ImageType, StatType } from "./Home";

export type AboutUsPageProps = Promise<{
  lng: string;
}>;

export type { ImageType };

export type HeroAboutUsProps = {
  hero_images: ImageType[];
  label: string;
  title: string;
  subtitle: string;
  hero_button: string;
  hero_secondary_button?: string;
  founded?: { value: string; label: string };
  locale: string;
};

export type ClientType = {
  name: string;
  description: string;
  /** Icon key resolved to an inline SVG in OurClients. */
  icon?: string;
};

export type OurClientsProps = {
  our_clients: {
    title: string;
    headline: string;
    subtitle: string;
    clients: ClientType[];
  };
};

export type AboutUsStatsProps = {
  stats: StatType[];
};

/** Home / about-us section that links to the catalogues page. */
export type CataloguesTeaserProps = {
  catalogues_title: string;
  catalogues_headline: string;
  catalogues_subtitle: string;
  catalogues_button: string;
  download_label: string;
  items: CatalogueItem[];
  locale: string;
};

/** Raw shape of the `about-us` single type as Strapi serves it. */
export type AboutUsDataType = {
  title?: string;
  label?: string;
  subtitle?: string;
  hero_button?: string;
  hero_secondary_button?: string;
  hero_images?: ImageType[];
  stats?: StatType[];
  our_clients?: {
    title?: string;
    headline?: string;
    subtitle?: string;
    clients?: ClientType[];
  };
  catalogues_title?: string;
  catalogues_headline?: string;
  catalogues_subtitle?: string;
  catalogues_button?: string;
};
