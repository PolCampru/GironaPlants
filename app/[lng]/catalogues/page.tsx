import HeroCatalogues from "@/components/specific/Catalogues/HeroCatalogues";
import SectionCatalogues from "@/components/specific/Catalogues/Section/SectionCatalogues";
import Contact from "@/components/specific/Home/Contact/Contact";
import {
  CataloguesProps,
  HeroCataloguesProps,
  SectionCataloguesProps,
} from "@/types/Catalogues";
import { ContactHomeProps } from "@/types/Home";
import React from "react";

export default async function CataloguesPage({ params }: CataloguesProps) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/catalogue?locale=${lng}&populate=*`;

  const response = await fetch(url);

  const json = await response.json();

  const heroCataloguesData: HeroCataloguesProps = {
    main_title: json.data.main_title,
    main_subtitle: json.data.main_subtitle,
    main_button: json.data.main_button,
    locale: lng,
    catalogue: json.data.main_catalogue,
  };

  const sectionCataloguesData: SectionCataloguesProps = {
    section_title: json.data.section_title,
    section_subtitle: json.data.section_subtitle,
    catalogue1_title: json.data.catalogue1_title,
    catalogue1_subtitle: json.data.catalogue1_subtitle,
    catalogue1_button: json.data.catalogue1_button,
    catalogue1: json.data.catalogue1,
    catalogue1_img: json.data.catalogue1_img,
    catalogue2_title: json.data.catalogue2_title,
    catalogue2_subtitle: json.data.catalogue2_subtitle,
    catalogue2_button: json.data.catalogue2_button,
    catalogue2: json.data.catalogue2,
    catalogue2_img: json.data.catalogue2_img,
    catalogue3_title: json.data.catalogue3_title,
    catalogue3_subtitle: json.data.catalogue3_subtitle,
    catalogue3_button: json.data.catalogue3_button,
    catalogue3: json.data.catalogue3,
    catalogue3_img: json.data.catalogue3_img,
  };

  const contactData: ContactHomeProps = {
    contact_title: json.data.contact_title,
    contact_subtitle: json.data.contact_subtitle,
    contact_button: json.data.contact_button,
    locale: lng,
  };

  return (
    <main>
      <HeroCatalogues data={heroCataloguesData} />
      {lng !== "en" && lng !== "fr" && (
        <SectionCatalogues data={sectionCataloguesData} />
      )}
      <Contact data={contactData} />
    </main>
  );
}
