"use client";

import React from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import {
  CardCover,
  CardInner,
  CardMeta,
  CardWrapper,
  DownloadLink,
  FormatTag,
  KindTag,
} from "./CatalogueCard.style";
import { CatalogueItem } from "@/types/Catalogues";
import { track } from "@/lib/analytics";

type CatalogueCardProps = {
  item: CatalogueItem;
  downloadLabel: string;
  /** Position in the grid, used only to pick a fallback cover. */
  index?: number;
  /** Alone in its row: lay the cover beside the text. */
  wide?: boolean;
};

// A catalogue published without a cover used to fall back to
// mainCatalogue.jpg — every coverless card showed the same picture, and the
// catalogues hero falls back to that same file, so a card echoed the hero
// too. Index into a small pool instead, so the cards stay distinct from each
// other and from the hero. Both grids render the list in the same order, so a
// given catalogue keeps the same photograph on the home teaser and on
// /catalogues. Past the end of the pool it cycles: the real fix for a fourth
// coverless catalogue is to upload its cover.
const FALLBACK_COVERS = [
  "/images/plants/rootedCuttings.jpg",
  "/images/plants/ferns.jpg",
];

const CatalogueCard = ({
  item,
  downloadLabel,
  index = 0,
  wide = false,
}: CatalogueCardProps) => (
  <CardWrapper $featured={item.featured} $wide={wide}>
    <CardCover $featured={item.featured} $wide={wide}>
      <Image
        src={item.imageUrl || FALLBACK_COVERS[index % FALLBACK_COVERS.length]}
        alt=""
        width={520}
        height={420}
        sizes={
          wide
            ? "(max-width: 720px) 100vw, 40vw"
            : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        }
      />
    </CardCover>

    <CardInner $wide={wide}>
      <CardMeta>
        {item.tag && <KindTag $featured={item.featured}>{item.tag}</KindTag>}
        <FormatTag>PDF</FormatTag>
      </CardMeta>

      <h3>{item.title}</h3>
      {item.subtitle && <p>{item.subtitle}</p>}

      {item.fileUrl && (
        <DownloadLink
          $featured={item.featured}
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          // The href is a PDF on the CMS host, so `download` alone would not
          // save it; opening in a new tab is what browsers actually honour.
          aria-label={`${item.button || downloadLabel}: ${item.title}`}
          onClick={() =>
            track("catalogue_download", {
              catalogue: item.featured ? "main" : item.title,
            })
          }
        >
          {item.button || downloadLabel}
          <FiDownload aria-hidden="true" />
        </DownloadLink>
      )}
    </CardInner>
  </CardWrapper>
);

export default CatalogueCard;
