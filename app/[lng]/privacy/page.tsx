import React from "react";
import PrivacyContent from "@/components/specific/Privacy/PrivacyContent";
import { PrivacyPageProps } from "@/types/Privacy";

export const metadata = {
  title: "GironaPlants Privacy",
  description: "Privacy Policy Page",
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lng } = await params;

  return (
    <main>
      <PrivacyContent lng={lng} />
    </main>
  );
}
