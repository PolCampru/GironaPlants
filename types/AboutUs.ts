export type AboutUsPageProps = Promise<{
  lng: string;
}>;

export type ImageType = {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
};

export type HeroAboutUsProps = {
  hero_images: ImageType[];
  title: string;
  subtitle: string;
  hero_button: string;
  locale: string;
};

export type OurClientsProps = {
  our_clients: {
    title: string;
    subtitle: string;
    clients: {
      name: string;
      description: string;
      image: string;
    }[];
  };
};

export type CataloguesProps = {
  catalogues_title: string;
  catalogues_subtitle: string;
  catalogues_button: string;
  locale: string;
};

export type AboutUsDataType = HeroAboutUsProps &
  OurClientsProps &
  CataloguesProps;
