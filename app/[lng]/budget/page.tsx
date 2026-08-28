import React from "react";
import { Metadata } from "next";
import BudgetScreen from "@/components/specific/BudgetScreen/BudgetScreen";
import { buildPageMetadata } from "@/data/seoContent";
import { getBudgetHeading, getContactHeading } from "@/data/pageHeadings";
import { getFormContent } from "@/data/formContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "budget");
}

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return (
    <BudgetScreen
      heading={getBudgetHeading(lng)}
      formHeading={getContactHeading(lng)}
      formContent={getFormContent(lng)}
    />
  );
}
