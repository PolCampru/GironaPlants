import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import GenusView from "@/components/specific/Catalogue/GenusView";
import {
  BreadcrumbStructuredData,
  GenusStructuredData,
} from "@/components/seo/StructuredData";
import {
  getGenus,
  getNeighbourGenera,
  toGenusSummary,
  topFormats,
} from "@/lib/catalogue";
import { getCatalogueCopy } from "@/data/catalogueContent";
import { SITE_URL, buildDynamicMetadata } from "@/data/seoContent";

type GenusPageProps = {
  params: Promise<{ lng: string; genus: string }>;
};

/** Facts every genus page needs, gathered once for the metadata and the body. */
async function loadGenus(lng: string, slug: string) {
  const genus = await getGenus(slug);
  if (!genus) return null;

  const rows = genus.species.flatMap((species) => species.rows);
  const formats = topFormats(rows).join(", ");

  return {
    genus,
    copy: getCatalogueCopy(lng),
    formats,
    leadParams: {
      genus: genus.name,
      species: genus.species.length,
      references: genus.rowCount,
      formats,
    },
  };
}

export async function generateMetadata({
  params,
}: GenusPageProps): Promise<Metadata> {
  const { lng, genus: slug } = await params;
  const data = await loadGenus(lng, slug);

  // No genus by that slug: the page itself 404s, and a 404 needs no metadata.
  if (!data) return {};

  const { copy, genus, leadParams } = data;

  return buildDynamicMetadata({
    lng,
    path: `/products/${genus.slug}`,
    title: copy.meta.genusTitle(genus.name),
    description: copy.meta.genusDescription(leadParams),
    keywords: copy.meta.genusKeywords(genus.name),
  });
}

export default async function GenusPage({ params }: GenusPageProps) {
  const { lng, genus: slug } = await params;

  const data = await loadGenus(lng, slug);
  if (!data) notFound();

  const { genus, copy, formats } = data;
  const neighbours = await getNeighbourGenera(genus.slug);

  const crumbs = [
    { name: copy.breadcrumb.home, href: `/${lng}` },
    { name: copy.breadcrumb.products, href: `/${lng}/products` },
    { name: genus.name },
  ];

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: copy.breadcrumb.home, url: `${SITE_URL}/${lng}` },
          { name: copy.breadcrumb.products, url: `${SITE_URL}/${lng}/products` },
          { name: genus.name, url: `${SITE_URL}/${lng}/products/${genus.slug}` },
        ]}
      />
      <GenusStructuredData
        genus={genus.name}
        url={`${SITE_URL}/${lng}/products/${genus.slug}`}
        items={genus.species.map((species) => ({
          name: species.name,
          url: `${SITE_URL}/${lng}/products/${genus.slug}/${species.slug}`,
        }))}
      />
      <GenusView
        genus={genus}
        neighbours={neighbours.map(toGenusSummary)}
        locale={lng}
        crumbs={crumbs}
        formats={formats}
      />
    </>
  );
}
