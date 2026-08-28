import React from "react";
import { Metadata } from "next";
import HeroCatalogues from "@/components/specific/Catalogues/HeroCatalogues";
import SectionCatalogues from "@/components/specific/Catalogues/Section/SectionCatalogues";
import Contact from "@/components/specific/Home/Contact/Contact";
import { getCataloguesPage } from "@/lib/catalogues";
import { getCataloguesContent } from "@/data/cataloguesContent";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/data/homeContent";
import { CataloguesPageProps } from "@/types/Catalogues";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "catalogues");
}

const text = (value: string | undefined | null, fallback: string) =>
  value && value.trim() ? value : fallback;

export default async function CataloguesPage({ params }: CataloguesPageProps) {
  const { lng } = await params;
  const fallback = getCataloguesContent(lng);

  // Never notFound(). The single type may not exist yet, may be unpublished,
  // or Strapi may be down — none of those should turn a linked navigation
  // item into a 404.
  const data = await getCataloguesPage(lng).catch(() => null);

  const items = data?.items ?? [];

  return (
    <>
      <HeroCatalogues
        data={{
          label: fallback.label,
          main_title: text(data?.main_title, fallback.main_title),
          main_subtitle: text(data?.main_subtitle, fallback.main_subtitle),
          main_button: text(data?.main_button, fallback.main_button),
          catalogue_url: data?.main_catalogue_url ?? "",
          cover_url: data?.main_cover_url ?? "",
          updated_label: data?.main_catalogue_url
            ? fallback.updated_label
            : undefined,
          browse_button: fallback.browse_button,
          request_button: fallback.request_button,
          locale: lng,
        }}
      />

      {items.length > 0 && (
        <SectionCatalogues
          data={{
            label: fallback.section_label,
            section_title: text(data?.section_title, fallback.section_title),
            section_subtitle: text(
              data?.section_subtitle,
              fallback.section_subtitle
            ),
            download_label: fallback.download_label,
            items,
          }}
        />
      )}

      <Contact
        data={{
          contact_title: text(data?.contact_title, fallback.contact_title),
          contact_subtitle: text(
            data?.contact_subtitle,
            fallback.contact_subtitle
          ),
          contact_button: text(data?.contact_button, fallback.contact_button),
          contact_phone: CONTACT_PHONE,
          contact_email: CONTACT_EMAIL,
          locale: lng,
        }}
      />
    </>
  );
}
