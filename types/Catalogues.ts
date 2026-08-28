export type CataloguesPageProps = {
  params: Promise<{
    lng: string;
  }>;
};

/**
 * One catalogue card, already normalized: URLs are absolute and the shape is
 * identical whether the data came from the new `catalogues` repeatable
 * component or from the legacy `catalogue1..3` flat fields.
 */
export type CatalogueItem = {
  id: string;
  title: string;
  subtitle: string;
  button: string;
  /** Absolute URL of the downloadable catalogue (PDF), "" if none. */
  fileUrl: string;
  /** Absolute URL of the card image, "" if none. */
  imageUrl: string;
};

export type HeroCataloguesProps = {
  label?: string;
  main_title: string;
  main_subtitle: string;
  main_button: string;
  /** Absolute URL of the main catalogue file, "" if none. */
  catalogue_url: string;
  /** Absolute URL of the cover image, "" to fall back to the local one. */
  cover_url: string;
  updated_label?: string;
  /** Shown instead of the download when no PDF has been uploaded yet. */
  browse_button: string;
  request_button: string;
  locale: string;
};

export type SectionCataloguesProps = {
  label?: string;
  section_title: string;
  section_subtitle: string;
  download_label: string;
  items: CatalogueItem[];
};

/** Fully normalized data for the /catalogues page. */
export type CataloguesPageData = {
  main_title: string;
  main_subtitle: string;
  main_button: string;
  main_catalogue_url: string;
  /** Absolute URL of the main catalogue's cover image, "" if none. */
  main_cover_url: string;
  section_title: string;
  section_subtitle: string;
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
  items: CatalogueItem[];
};
