"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { getCatalogueCopy } from "@/data/catalogueContent";
import type { GenusSummary } from "@/lib/catalogue";
import { Block, Chip, ChipRow, IndexGroup, IndexLetter } from "./Catalogue.style";

/**
 * The A-Z of every genus, at the foot of /products.
 *
 * Without it the ~1,100 genus and species pages are orphans: the catalogue
 * table above is client-rendered and paginated 25 rows at a time, so a crawler
 * never sees a link to any of them. This is the entry point to all of it, and
 * it is server-rendered on purpose.
 */
const GenusDirectory = ({
  genera,
  locale,
}: {
  genera: GenusSummary[];
  locale: string;
}) => {
  if (genera.length === 0) return null;

  const copy = getCatalogueCopy(locale).directory;

  const groups = new Map<string, GenusSummary[]>();
  for (const genus of genera) {
    const letter = genus.name.charAt(0).toUpperCase();
    const group = groups.get(letter);
    if (group) group.push(genus);
    else groups.set(letter, [genus]);
  }

  return (
    <Block>
      <SectionHeading
        size="md"
        label={copy.label}
        title={copy.title}
        lead={copy.lead}
      />

      {[...groups].map(([letter, entries]) => (
        <IndexGroup key={letter}>
          <IndexLetter>{letter}</IndexLetter>
          <ChipRow>
            {entries.map((genus) => (
              <Chip key={genus.slug} href={`/${locale}/products/${genus.slug}`}>
                {genus.name}
                <small>{genus.rowCount}</small>
              </Chip>
            ))}
          </ChipRow>
        </IndexGroup>
      ))}
    </Block>
  );
};

export default GenusDirectory;
