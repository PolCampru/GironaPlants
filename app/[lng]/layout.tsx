import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BusinessStructuredData } from "@/components/seo/StructuredData";
import { getLanguages } from "@/lib/languages";

// No generateStaticParams here on purpose: these pages fetch their own
// /api/strapi route through an absolute URL, which nothing serves during the
// build, so pre-rendering them just times out. They stay server-rendered on
// demand, as they were.

// The root layout sits above the [lng] segment and cannot know the locale;
// the localized JSON-LD is emitted here instead (body placement is valid for
// structured data).
export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  // Anything that is not one of the four locales is a 404, not the home page
  // rendered with a nonsense locale. Every unmatched path — /sw.js, /favicon
  // probes, a mistyped URL — used to fall through to this segment and render
  // a full page, which also sent requests like `?locale=sw.js` to Strapi and
  // gave search engines unlimited duplicate URLs.
  if (!getLanguages().includes(lng)) notFound();

  return (
    <>
      <BusinessStructuredData locale={lng} />
      {children}
    </>
  );
}
