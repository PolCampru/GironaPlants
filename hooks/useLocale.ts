"use client";

import { usePathname } from "next/navigation";
import { getLanguages } from "@/lib/languages";

/**
 * The active locale, read from the URL.
 *
 * Not `i18n.language`: react-i18next detects the locale from the path in the
 * browser only, so during the server render it falls back to "ca". Anything
 * locale-dependent that is server-rendered — currency, number formatting —
 * came out Catalan on the server and correct on the client, which is a
 * hydration mismatch.
 */
export default function useLocale(): string {
  const pathname = usePathname();
  const locales = getLanguages();
  const segment = pathname?.split("/").filter(Boolean)[0] ?? "";
  return locales.includes(segment) ? segment : "es";
}
