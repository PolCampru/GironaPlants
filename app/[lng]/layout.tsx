import { ReactNode } from "react";
import { BusinessStructuredData } from "@/components/seo/StructuredData";

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

  return (
    <>
      <BusinessStructuredData locale={lng} />
      {children}
    </>
  );
}
