import { CataloguesProps } from "./AboutUs";

export type HomePageProps = {
  params: {
    lng: string;
  };
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

export type HeroHomeProps = {
  hero_images: ImageType[];
  hero_title: string;
  hero_subtitle: string;
  hero_button: string;
  locale: string;
};

export type PlantsHomeProps = {
  plants_title: string;
  plants_subtitle: string;
  plants_button: string;
  locale: string;
};

export type ContactHomeProps = {
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
  locale: string;
};

export type HomeDataType = HeroHomeProps &
  PlantsHomeProps &
  CataloguesProps &
  ContactHomeProps;

export type OurPlantsType = {
  key: string;
  title: string;
  img: string;
}[];
