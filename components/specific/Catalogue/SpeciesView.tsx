"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { formatPrice } from "@/lib/format";
import type { SpeciesEntry, SpeciesSummary } from "@/lib/catalogue";
import { getCatalogueCopy } from "@/data/catalogueContent";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import ReferenceTable from "./ReferenceTable";
import CatalogueCta from "./CatalogueCta";
import {
  Block,
  Chip,
  ChipRow,
  PageWrapper,
  Stat,
  StatRow,
} from "./Catalogue.style";
import CtaLink from "@/components/ui/CtaLink/CtaLink";

type SpeciesViewProps = {
  species: SpeciesEntry;
  genus: { slug: string; name: string };
  /** Every other name in the genus. Narrowed: only the links are rendered. */
  siblings: SpeciesSummary[];
  locale: string;
  crumbs: Crumb[];
};

/** The deepest page: one botanical name and every format we hold it in. */
const SpeciesView = ({
  species,
  genus,
  siblings,
  locale,
  crumbs,
}: SpeciesViewProps) => {
  // See GenusView: the copy holds functions, so it cannot cross the boundary.
  const copy = getCatalogueCopy(locale);

  return (
    <PageWrapper>
      <Breadcrumbs items={crumbs} label={copy.breadcrumb.products} />

      <SectionHeading
        as="h1"
        label={copy.species.label}
        title={species.name}
        lead={copy.species.lead({
          name: species.name,
          genus: genus.name,
          formats: species.rows.length,
          formatList: species.potSizes.join(", "),
          heightList: species.heights.join(", "),
          price:
            species.minPrice != null
              ? formatPrice(species.minPrice, locale)
              : "",
        })}
      />

      <StatRow>
        <Stat>
          <dt>{copy.genus.label}</dt>
          <dd>{genus.name}</dd>
        </Stat>
        {species.potSizes.length > 0 && (
          <Stat>
            <dt>{copy.table.potSize}</dt>
            <dd>{species.potSizes.join(" · ")}</dd>
          </Stat>
        )}
        {species.heights.length > 0 && (
          <Stat>
            <dt>{copy.table.height}</dt>
            <dd>{species.heights.join(" · ")}</dd>
          </Stat>
        )}
      </StatRow>

      <Block>
        <SectionHeading size="md" title={copy.species.formatsHeading} />
        <ReferenceTable rows={species.rows} locale={locale} copy={copy.table} />
      </Block>

      <CatalogueCta copy={copy.cta} locale={locale} />

      <Block>
        {siblings.length > 0 ? (
          <>
            <SectionHeading
              size="md"
              title={copy.species.siblingsHeading(genus.name)}
              action={
                <CtaLink
                  href={`/${locale}/products/${genus.slug}`}
                  $variant="ghost"
                  $size="md"
                >
                  {copy.species.seeGenus(genus.name)}
                </CtaLink>
              }
            />
            <ChipRow>
              {siblings.map((sibling) => (
                <Chip
                  key={sibling.slug}
                  href={`/${locale}/products/${genus.slug}/${sibling.slug}`}
                >
                  <em>{sibling.name}</em>
                  <small>{sibling.rowCount}</small>
                </Chip>
              ))}
            </ChipRow>
          </>
        ) : (
          // The only name in its genus: no sibling list to show, but the page
          // still needs a link back up rather than a dead end.
          <CtaLink
            href={`/${locale}/products/${genus.slug}`}
            $variant="ghost"
            $size="md"
          >
            {copy.species.seeGenus(genus.name)}
          </CtaLink>
        )}
      </Block>

    </PageWrapper>
  );
};

export default SpeciesView;
