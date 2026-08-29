"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight, FiDownload, FiFileText } from "react-icons/fi";
import {
  ActionRow,
  CoverFrame,
  DownloadButton,
  HeroWrapper,
  InfoContainer,
  Label,
  MetaChip,
  MetaRow,
} from "./HeroCatalogues.style";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { HeroCataloguesProps } from "@/types/Catalogues";
import { track } from "@/lib/analytics";

const MAIN_COVER = "/images/mainCatalogue.jpg";

const HeroCatalogues = ({ data }: { data: HeroCataloguesProps }) => (
  <HeroWrapper>
    <CoverFrame>
      <Image
        src={data.cover_url || MAIN_COVER}
        alt=""
        width={700}
        height={930}
        priority
        sizes="(max-width: 900px) 60vw, 30vw"
      />
    </CoverFrame>

    <InfoContainer>
      {data.label && <Label>{data.label}</Label>}
      <h1>{data.main_title}</h1>
      {/* Was an <h2>, which turned the supporting sentence into a heading. */}
      {data.main_subtitle && <p>{data.main_subtitle}</p>}

      {/* The chips describe a file, so they only appear when there is one.
          The PDF has to be uploaded in the admin panel; until then the hero
          offers the quote form instead of a dead download button. */}
      {data.catalogue_url ? (
        <>
          <MetaRow>
            <MetaChip>
              <FiFileText aria-hidden="true" size={14} />
              PDF
            </MetaChip>
            {data.updated_label && (
              <MetaChip $accent>{data.updated_label}</MetaChip>
            )}
          </MetaRow>

          {/* The download used to be a <Button> inside a div with an onclick
              calling window.open — not focusable, not a link, invisible to
              screen readers and to "open in new tab". */}
          <ActionRow>
            <DownloadButton
              href={data.catalogue_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("catalogue_download", {
                  catalogue: "main",
                  locale: data.locale,
                })
              }
            >
              {data.main_button}
              <FiDownload aria-hidden="true" />
            </DownloadButton>
          </ActionRow>
        </>
      ) : (
        <ActionRow>
          <CtaLink href={`/${data.locale}/products`} $variant="solid">
            {data.browse_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
          <CtaLink href={`/${data.locale}/contact`} $variant="outline">
            {data.request_button}
          </CtaLink>
        </ActionRow>
      )}
    </InfoContainer>
  </HeroWrapper>
);

export default HeroCatalogues;
