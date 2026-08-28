import { fetchStrapiData, strapiMediaUrl, StrapiError } from "./strapi";
import { CatalogueItem, CataloguesPageData } from "@/types/Catalogues";

// Normalizes the `catalogues` repeatable component into CatalogueItem[].
// The flat `catalogue1..3` fields this used to also read were removed from
// the CMS schema once every locale had been migrated to the array.

function normalizeItems(data: Record<string, unknown>): CatalogueItem[] {
  if (!Array.isArray(data.catalogues)) return [];

  return (data.catalogues as Record<string, unknown>[]).map((item, index) => ({
    id: String(item.id ?? index),
    title: (item.title as string) ?? "",
    subtitle: (item.subtitle as string) ?? "",
    button: (item.button as string) ?? "",
    fileUrl: strapiMediaUrl(item.file as { url?: string } | null),
    imageUrl: strapiMediaUrl(item.image as { url?: string } | null),
  }));
}

export async function getCataloguesPage(
  locale: string
): Promise<CataloguesPageData | null> {
  // Explicit populate: `populate=*` only goes one level deep, so it would not
  // populate the media fields inside the `catalogues` component.
  const query =
    `catalogue?locale=${locale}` +
    `&populate[main_catalogue]=true&populate[main_cover]=true` +
    `&populate[catalogues][populate]=*`;

  let data: Record<string, unknown> | null = null;
  try {
    data = await fetchStrapiData(query, { retries: 1 });
  } catch (error) {
    // A missing or unpublished single type is a 404 — render nothing rather
    // than failing the page.
    if (error instanceof StrapiError && error.status === 404) return null;
    throw error;
  }
  if (!data) return null;

  const str = (key: string) => (data?.[key] as string) ?? "";

  return {
    main_title: str("main_title"),
    main_subtitle: str("main_subtitle"),
    main_button: str("main_button"),
    main_catalogue_url: strapiMediaUrl(
      data.main_catalogue as { url?: string } | null
    ),
    main_cover_url: strapiMediaUrl(data.main_cover as { url?: string } | null),
    section_title: str("section_title"),
    section_subtitle: str("section_subtitle"),
    contact_title: str("contact_title"),
    contact_subtitle: str("contact_subtitle"),
    contact_button: str("contact_button"),
    items: normalizeItems(data),
  };
}
