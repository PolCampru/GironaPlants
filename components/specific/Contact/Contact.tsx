"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  Aside,
  AsideImage,
  AsidePanel,
  CatalogueCallout,
  ContactLayout,
  ContactRow,
  ContactRows,
  Divider,
  LanguageBlock,
  LanguageChip,
  RowIcon,
  RowText,
} from "./Contact.style";
import Form from "@/components/ui/Form/Form";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { ContactAsideType, FormType } from "@/types/Contact";
import type { PageHeading } from "@/data/pageHeadings";

/**
 * Form on the left, everything a visitor might prefer over a form on the
 * right. The previous layout put a decorative 3x3 grid of photos and flat
 * colour blocks where the phone number should have been.
 */
const Contact = ({
  locale,
  heading,
  formContent,
  aside,
}: {
  locale: string;
  heading: PageHeading;
  formContent: FormType;
  aside: ContactAsideType;
}) => {
  const rows = [
    { key: "phone", icon: FiPhone, data: aside?.phone, href: aside?.phone?.text ? `tel:${aside.phone.text.replace(/\s/g, "")}` : undefined },
    { key: "email", icon: FiMail, data: aside?.email, href: aside?.email?.text ? `mailto:${aside.email.text}` : undefined },
    { key: "hours", icon: FiClock, data: aside?.hours },
    { key: "location", icon: FiMapPin, data: aside?.location },
  ].filter((row) => row.data?.text);

  return (
    <ContactLayout>
      <Form heading={heading} content={formContent} headingLevel="h1" />

      <Aside>
        <AsidePanel>
          {aside?.title && <h2>{aside.title}</h2>}

          <ContactRows>
            {rows.map(({ key, icon: Icon, data, href }) => (
              <ContactRow key={key} as={href ? "a" : "div"} href={href}>
                <RowIcon>
                  <Icon aria-hidden="true" size={19} />
                </RowIcon>
                <RowText>
                  <span>{data!.title}</span>
                  <strong>{data!.text}</strong>
                </RowText>
              </ContactRow>
            ))}
          </ContactRows>

          {aside?.languages?.length > 0 && (
            <>
              <Divider />
              <LanguageBlock>
                <span>{aside.languagesTitle}</span>
                <div>
                  {aside.languages.map((language) => (
                    <LanguageChip key={language}>{language}</LanguageChip>
                  ))}
                </div>
              </LanguageBlock>
            </>
          )}
        </AsidePanel>

        <AsideImage>
          <Image
            src="/images/plants/nursery.jpg"
            alt=""
            width={520}
            height={360}
            sizes="(max-width: 1024px) 100vw, 30vw"
          />
        </AsideImage>

        {aside?.catalogue?.title && (
          <CatalogueCallout>
            <h2>{aside.catalogue.title}</h2>
            <p>{aside.catalogue.text}</p>
            <CtaLink
              href={`/${locale}/products`}
              $variant="solid"
              $size="md"
              style={{ alignSelf: "flex-start" }}
            >
              {aside.catalogue.button}
              <FiArrowRight aria-hidden="true" />
            </CtaLink>
          </CatalogueCallout>
        )}
      </Aside>
    </ContactLayout>
  );
};

export default Contact;
