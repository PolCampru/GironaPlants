"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  BottomBar,
  BrandColumn,
  ColumnTitle,
  ContactLink,
  FooterColumn,
  FooterGrid,
  FooterInner,
  FooterLink,
  FooterNote,
  FooterOuter,
  LocaleLink,
  LocaleRow,
} from "./Footer.style";
import { getLanguages } from "@/lib/languages";
import {
  CONTACT_LINKS,
  LOGO,
  getNavigation,
  navHref,
} from "@/data/navigation";
import { getUiLabels } from "@/data/uiLabels";

const CATALOGUE_SLUGS = ["products", "catalogues", "offers"];
const COMPANY_SLUGS = ["about-us", "contact"];

/**
 * Copy comes from data/navigation.ts, not runtime i18n — see the note there.
 */
const Footer = ({ year }: { year: number }) => {
  const pathname = usePathname();
  const locales = getLanguages();
  const segment = pathname?.split("/")[1] ?? "";
  const lng = locales.includes(segment) ? segment : "es";

  const { items, footer } = getNavigation(lng);
  const labels = getUiLabels(lng);
  const pick = (slugs: string[]) =>
    items.filter((item) => slugs.includes(item.slug));

  return (
    <FooterOuter aria-label={labels.footerNav}>
      <FooterInner>
        <FooterGrid>
          <BrandColumn>
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={120}
              height={60}
              style={{ width: "auto", height: "2.5rem", objectFit: "contain" }}
              sizes="120px"
              loading="lazy"
            />
            <p>{footer.tagline}</p>
          </BrandColumn>

          <FooterColumn>
            <ColumnTitle>{footer.columns.catalogue}</ColumnTitle>
            {pick(CATALOGUE_SLUGS).map((item) => (
              <FooterLink key={item.slug} href={navHref(lng, item.slug)}>
                {item.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>{footer.columns.company}</ColumnTitle>
            {pick(COMPANY_SLUGS).map((item) => (
              <FooterLink key={item.slug} href={navHref(lng, item.slug)}>
                {item.name}
              </FooterLink>
            ))}
            <FooterLink href={`/${lng}/privacy`}>
              {footer.privacyPolicy}
            </FooterLink>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>{footer.columns.contact}</ColumnTitle>
            <ContactLink
              href={`tel:${CONTACT_LINKS.phone.replace(/\s/g, "")}`}
              aria-label={`${footer.columns.contact}: ${CONTACT_LINKS.phone}`}
            >
              {CONTACT_LINKS.phone}
            </ContactLink>
            <ContactLink href={`mailto:${CONTACT_LINKS.email}`}>
              {CONTACT_LINKS.email}
            </ContactLink>
            <FooterNote>{footer.location}</FooterNote>
          </FooterColumn>
        </FooterGrid>

        <BottomBar>
          {/* The year is resolved once on the server and passed in, so it
              stays current without the server and the client each calling
              new Date() and disagreeing. */}
          <p>
            © {year} Girona Plants. {footer.rights}
          </p>
          <LocaleRow aria-label={labels.language}>
            {locales.map((locale) => (
              <LocaleLink
                key={locale}
                href={`/${locale}`}
                $active={locale === lng}
                hrefLang={locale}
                aria-current={locale === lng ? "true" : undefined}
              >
                {locale}
              </LocaleLink>
            ))}
          </LocaleRow>
        </BottomBar>
      </FooterInner>
    </FooterOuter>
  );
};

export default Footer;
