export type CataloguesProps = {
  params: {
    lng: string;
  };
};

export type Image = {
  url: string;
};

export type Catalogue = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type HeroCataloguesProps = {
  main_title: string;
  main_subtitle: string;
  main_button: string;
  locale: string;
  catalogue: Catalogue;
};

export type SectionCataloguesProps = {
  section_title: string;
  section_subtitle: string;
  catalogue1_title: string;
  catalogue1_subtitle: string;
  catalogue1_button: string;
  catalogue1: Catalogue;
  catalogue1_img: Image;
  catalogue2_title: string;
  catalogue2_subtitle: string;
  catalogue2_button: string;
  catalogue2: Catalogue;
  catalogue2_img: Image;
  catalogue3_title: string;
  catalogue3_subtitle: string;
  catalogue3_button: string;
  catalogue3: Catalogue;
  catalogue3_img: Image;
};

export type CataloguesDataType = HeroCataloguesProps & SectionCataloguesProps;
