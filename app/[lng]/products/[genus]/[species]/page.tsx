import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SpeciesView from "@/components/specific/Catalogue/SpeciesView";
import {
  BreadcrumbStructuredData,
  SpeciesStructuredData,
} from "@/components/seo/StructuredData";
import { getSpecies, toSpeciesSummary } from "@/lib/catalogue";
import { getCatalogueCopy } from "@/data/catalogueContent";
import { SITE_URL, buildDynamicMetadata } from "@/data/seoContent";
import { formatPrice } from "@/lib/format";

type SpeciesPageProps = {
  params: Promise<{ lng: string; genus: string; species: string }>;
};

async function loadSpecies(lng: string, genusSlug: string, speciesSlug: string) {
  const found = await getSpecies(genusSlug, speciesSlug);
  if (!found) return null;

  const { genus, species } = found;

  return {
    genus,
    species,
    copy: getCatalogueCopy(lng),
    leadParams: {
      name: species.name,
      genus: genus.name,
      formats: species.rows.length,
      formatList: species.potSizes.join(", "),
      heightList: species.heights.join(", "),
      price:
        species.minPrice != null ? formatPrice(species.minPrice, lng) : "",
    },
  };
}

export async function generateMetadata({
  params,
}: SpeciesPageProps): Promise<Metadata> {
  const { lng, genus: genusSlug, species: speciesSlug } = await params;
  const data = await loadSpecies(lng, genusSlug, speciesSlug);

  if (!data) return {};

  const { copy, genus, species, leadParams } = data;

  return buildDynamicMetadata({
    lng,
    path: `/products/${genus.slug}/${species.slug}`,
    title: copy.meta.speciesTitle(species.name),
    description: copy.meta.speciesDescription(leadParams),
    keywords: copy.meta.speciesKeywords(species.name),
  });
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const { lng, genus: genusSlug, species: speciesSlug } = await params;

  const data = await loadSpecies(lng, genusSlug, speciesSlug);
  if (!data) notFound();

  const { genus, species, copy, leadParams } = data;
  const url = `${SITE_URL}/${lng}/products/${genus.slug}/${species.slug}`;

  const crumbs = [
    { name: copy.breadcrumb.home, href: `/${lng}` },
    { name: copy.breadcrumb.products, href: `/${lng}/products` },
    { name: genus.name, href: `/${lng}/products/${genus.slug}` },
    { name: species.name },
  ];

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: copy.breadcrumb.home, url: `${SITE_URL}/${lng}` },
          { name: copy.breadcrumb.products, url: `${SITE_URL}/${lng}/products` },
          { name: genus.name, url: `${SITE_URL}/${lng}/products/${genus.slug}` },
          { name: species.name, url },
        ]}
      />
      <SpeciesStructuredData
        name={species.name}
        url={url}
        genus={genus.name}
        lowPrice={species.minPrice}
        highPrice={species.maxPrice}
        offerCount={species.pricedCount}
        description={copy.meta.speciesDescription(leadParams)}
      />
      <SpeciesView
        species={species}
        genus={{ slug: genus.slug, name: genus.name }}
        siblings={genus.species
          .filter((sibling) => sibling.slug !== species.slug)
          .map(toSpeciesSummary)}
        locale={lng}
        crumbs={crumbs}
      />
    </>
  );
}
