/**
 * Money formatting shared by the table, the offer cards and the quote list.
 *
 * Prices were interpolated raw next to a "€" — "13.6 €" — which uses the
 * wrong decimal separator and a variable number of decimals in every locale
 * the site serves.
 */
const LOCALE_TAGS: Record<string, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-IE",
  fr: "fr-FR",
};

export function formatPrice(value: number | string | undefined | null, locale = "es") {
  const amount = typeof value === "string" ? Number(value) : value;
  if (amount == null || Number.isNaN(amount)) return "";

  return new Intl.NumberFormat(LOCALE_TAGS[locale] ?? LOCALE_TAGS.es, {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/**
 * Plain integer formatting — quantities in the quote, where "1.530 unidades"
 * has to use the locale's thousands separator.
 */
export function formatNumber(value: number, locale = "es") {
  return new Intl.NumberFormat(LOCALE_TAGS[locale] ?? LOCALE_TAGS.es).format(
    value
  );
}
