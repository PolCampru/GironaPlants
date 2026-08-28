import React from "react";
import { Metadata } from "next";
import Contact from "@/components/specific/Contact/Contact";
import { ContactPageProps } from "@/types/Contact";
import { buildPageMetadata } from "@/data/seoContent";
import { getContactHeading } from "@/data/pageHeadings";
import { getFormContent } from "@/data/formContent";
import { getContactAside } from "@/data/contactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lng } = await params;

  // The separate PhoneAndEmail section is gone: the phone number, email,
  // opening hours and location now sit beside the form instead of below it.
  return (
    <Contact
      locale={lng}
      heading={getContactHeading(lng)}
      formContent={getFormContent(lng)}
      aside={getContactAside(lng)}
    />
  );
}
