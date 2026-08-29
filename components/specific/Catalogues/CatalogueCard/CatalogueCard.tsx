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
} from "./CatalogueCard.style";
import { CatalogueItem } from "@/types/Catalogues";
import { track } from "@/lib/analytics";

type CatalogueCardProps = {
  item: CatalogueItem;
  downloadLabel: string;
};

const CATALOGUE_FALLBACK_COVER = "/images/mainCatalogue.jpg";

const CatalogueCard = ({ item, downloadLabel }: CatalogueCardProps) => (
  <CardWrapper>
    <CardCover>
      <Image
        src={item.imageUrl || CATALOGUE_FALLBACK_COVER}
        alt=""
        width={520}
        height={420}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
      />
    </CardCover>

    <CardInner>
      <CardMeta>
        <FormatTag>PDF</FormatTag>
      </CardMeta>

      <h3>{item.title}</h3>
      {item.subtitle && <p>{item.subtitle}</p>}

      {item.fileUrl && (
        <DownloadLink
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          // The href is a PDF on the CMS host, so `download` alone would not
          // save it; opening in a new tab is what browsers actually honour.
          aria-label={`${item.button || downloadLabel}: ${item.title}`}
          onClick={() => track("catalogue_download", { catalogue: item.title })}
        >
          {item.button || downloadLabel}
          <FiDownload aria-hidden="true" />
        </DownloadLink>
      )}
    </CardInner>
  </CardWrapper>
);

export default CatalogueCard;
