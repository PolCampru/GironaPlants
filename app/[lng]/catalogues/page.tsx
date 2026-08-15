import HeroCatalogues from "@/components/specific/Catalogues/HeroCatalogues";
import SectionCatalogues from "@/components/specific/Catalogues/Section/SectionCatalogues";
import Contact from "@/components/specific/Home/Contact/Contact";
import { getCataloguesPage } from "@/lib/catalogues";
import { CataloguesPageProps } from "@/types/Catalogues";
import { ContactHomeProps } from "@/types/Home";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "GironaPlants Catalogues",
  description: "Bienvenido a la página de catálogos",
};

export default async function CataloguesPage({ params }: CataloguesPageProps) {
  const { lng } = await params;

  const data = await getCataloguesPage(lng);

  if (!data) {
    notFound();
  }

  const contactData: ContactHomeProps = {
    contact_title: data.contact_title,
    contact_subtitle: data.contact_subtitle,
    contact_button: data.contact_button,
    locale: lng,
  };

  return (
    <>
      <section>
        <HeroCatalogues
          data={{
            main_title: data.main_title,
            main_subtitle: data.main_subtitle,
            main_button: data.main_button,
            catalogue_url: data.main_catalogue_url,
          }}
        />
      </section>
      {data.items.length > 0 && (
        <section>
          <SectionCatalogues
            data={{
              section_title: data.section_title,
              section_subtitle: data.section_subtitle,
              items: data.items,
            }}
          />
        </section>
      )}
      <section>
        <Contact data={contactData} />
      </section>
    </>
  );
}
