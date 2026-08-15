import BudgetScreen from "@/components/specific/BudgetScreen/BudgetScreen";
import React from "react";

import { Metadata } from "next";
import { buildPageMetadata } from "@/data/seoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  return buildPageMetadata(lng, "budget");
}

const BudgetPage = () => {
  return (
    <section>
      <BudgetScreen />
    </section>
  );
};

export default BudgetPage;
