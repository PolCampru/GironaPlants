import { fetchStrapiData, strapiMediaUrl, StrapiError } from "./strapi";
import { CatalogueItem, CataloguesPageData } from "@/types/Catalogues";

// The catalogue single type is being migrated from flat `catalogue1..3`
// fields to a `catalogues` repeatable component. This module normalizes both
// shapes into CatalogueItem[], so the frontend and the CMS can be deployed in
// any order.

const LEGACY_SLOTS = [1, 2, 3] as const;

// The pre-migration page hardcoded "hide the catalogue section on en/fr".
// Once the CMS serves the `catalogues` array, visibility is controlled by the
// editor (empty array = hidden) and this list is ignored.
const LEGACY_HIDDEN_LOCALES = ["en", "fr"];

function normalizeItems(
  data: Record<string, any>,
  locale: string
): CatalogueItem[] {
  // The field being present at all means the new schema is live; an editor
  // emptying the array must hide the section, not resurrect the legacy cards.
  if (Array.isArray(data.catalogues)) {
    return data.catalogues.map((item: any, index: number) => ({
      id: String(item.id ?? index),
      title: item.title ?? "",
      subtitle: item.subtitle ?? "",
      button: item.button ?? "",
      fileUrl: strapiMediaUrl(item.file),
      imageUrl: strapiMediaUrl(item.image),
    }));
  }

  // Legacy shape: catalogueN_title / catalogueN_subtitle / catalogueN_button /
  // catalogueN (file) / catalogueN_img.
  if (LEGACY_HIDDEN_LOCALES.includes(locale)) return [];
  const items: CatalogueItem[] = [];
  for (const n of LEGACY_SLOTS) {
    const title = data[`catalogue${n}_title`];
    const subtitle = data[`catalogue${n}_subtitle`];
    const button = data[`catalogue${n}_button`];
    const file = data[`catalogue${n}`];
    const image = data[`catalogue${n}_img`];
    if (!title && !subtitle && !button && !file && !image) continue;
    items.push({
      id: `legacy-${n}`,
      title: title ?? "",
      subtitle: subtitle ?? "",
      button: button ?? "",
      fileUrl: strapiMediaUrl(file),
      imageUrl: strapiMediaUrl(image),
    });
  }
  return items;
}

export async function getCataloguesPage(
  locale: string
): Promise<CataloguesPageData | null> {
  // Explicit populate: `populate=*` only goes one level deep, so it would not
  // populate the media fields inside the `catalogues` component.
  const primary =
    `catalogue?locale=${locale}` +
    `&populate[main_catalogue]=true&populate[catalogues][populate]=*`;
  // Pre-migration Strapi rejects the unknown `catalogues` populate key with a
  // 400 — only that case falls back to the legacy wildcard query. Any other
  // failure (5xx, timeout) propagates, so a transient outage on a migrated
  // CMS can't cache a media-less legacy rendering for an hour.
  const legacy = `catalogue?locale=${locale}&populate=*`;

  let data: Record<string, any> | null = null;
  try {
    data = await fetchStrapiData(primary, { retries: 1 });
  } catch (error) {
    if (error instanceof StrapiError && error.status === 400) {
      data = await fetchStrapiData(legacy);
    } else {
      throw error;
    }
  }
  if (!data) return null;

  return {
    main_title: data.main_title ?? "",
    main_subtitle: data.main_subtitle ?? "",
    main_button: data.main_button ?? "",
    main_catalogue_url: strapiMediaUrl(data.main_catalogue),
    section_title: data.section_title ?? "",
    section_subtitle: data.section_subtitle ?? "",
    contact_title: data.contact_title ?? "",
    contact_subtitle: data.contact_subtitle ?? "",
    contact_button: data.contact_button ?? "",
    items: normalizeItems(data, locale),
  };
}
