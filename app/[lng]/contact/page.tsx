import Contact from "@/components/specific/Contact/Contact";
import PhoneAndEmail from "@/components/specific/Contact/PhoneAndEmail/PhoneAndEmail";
import React from "react";

import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "contact");
}

const ContactPage = () => {
  return (
    <>
      <section>
        <Contact />
      </section>
      <section>
        <PhoneAndEmail />
      </section>
    </>
  );
};

export default ContactPage;
