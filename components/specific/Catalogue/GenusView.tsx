"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { formatNumber, formatPrice } from "@/lib/format";
import type { GenusEntry, GenusSummary } from "@/lib/catalogue";
import { getCatalogueCopy } from "@/data/catalogueContent";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import ReferenceTable from "./ReferenceTable";
import CatalogueCta from "./CatalogueCta";
import {
  Block,
  CardGrid,
  Chip,
  ChipRow,
  PageWrapper,
  SpeciesCard,
  Stat,
  StatRow,
} from "./Catalogue.style";

type GenusViewProps = {
  genus: GenusEntry;
  neighbours: GenusSummary[];
  locale: string;
  crumbs: Crumb[];
  /** The most common pot sizes, already narrowed and joined by the page. */
  formats: string;
};

/**
 * A genus hub: every species we hold under one botanical name, with the
 * formats and prices, and links down to each species page. One of ~336, and
 * the level most trade searches land on ("quercus vivero", "lavandula gros").
 */
const GenusView = ({
  genus,
  neighbours,
  locale,
  crumbs,
  formats,
}: GenusViewProps) => {
  // Read here rather than passed in: the copy carries functions, and a server
  // component cannot hand a function to a client one.
  const copy = getCatalogueCopy(locale);

  const rows = genus.species.flatMap((species) => species.rows);
  const speciesBySlug = new Map(
    genus.species.flatMap((species) =>
      species.rows.map((row) => [row.id, species.slug] as const)
    )
  );

  return (
    <PageWrapper>
      <Breadcrumbs items={crumbs} label={copy.breadcrumb.products} />

      <SectionHeading
        as="h1"
        label={copy.genus.label}
        title={genus.name}
        lead={copy.genus.lead({
          genus: genus.name,
          species: genus.species.length,
          references: genus.rowCount,
          formats,
        })}
      />

      <StatRow>
        <Stat>
          <dt>{copy.genus.speciesHeading}</dt>
          <dd>{formatNumber(genus.species.length, locale)}</dd>
        </Stat>
        <Stat>
          <dt>{copy.genus.referencesHeading}</dt>
          <dd>{formatNumber(genus.rowCount, locale)}</dd>
        </Stat>
        {genus.minPrice != null && (
          <Stat>
            <dt>{copy.table.price}</dt>
            <dd>{formatPrice(genus.minPrice, locale)}+</dd>
          </Stat>
        )}
      </StatRow>

      <Block>
        <SectionHeading
          size="md"
          title={copy.genus.speciesHeading}
          lead={copy.genus.speciesLead}
        />
        <CardGrid>
          {genus.species.map((species) => (
            <SpeciesCard
              key={species.slug}
              href={`/${locale}/products/${genus.slug}/${species.slug}`}
            >
              <strong>{species.name}</strong>
              <span>
                {species.potSizes.join(" · ") || "—"}
                {species.minPrice != null &&
                  ` · ${formatPrice(species.minPrice, locale)}`}
              </span>
            </SpeciesCard>
          ))}
        </CardGrid>
      </Block>

      <Block>
        <SectionHeading size="md" title={copy.genus.referencesHeading} />
        <ReferenceTable
          rows={rows}
          locale={locale}
          copy={copy.table}
          showSpecies
          speciesHref={(row) => {
            const slug = speciesBySlug.get(row.id);
            return slug ? `/${locale}/products/${genus.slug}/${slug}` : null;
          }}
        />
      </Block>

      <CatalogueCta copy={copy.cta} locale={locale} />

      {neighbours.length > 0 && (
        <Block>
          <SectionHeading
            size="md"
            title={copy.genus.neighboursHeading}
            lead={copy.genus.neighboursLead}
          />
          <ChipRow>
            {neighbours.map((other) => (
              <Chip key={other.slug} href={`/${locale}/products/${other.slug}`}>
                {other.name}
                <small>{other.rowCount}</small>
              </Chip>
            ))}
          </ChipRow>
        </Block>
      )}
    </PageWrapper>
  );
};

export default GenusView;
