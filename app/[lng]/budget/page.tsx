import BudgetScreen from "@/components/specific/BudgetScreen/BudgetScreen";
import React from "react";

export const metadata = {
  title: "GironaPlants Budget",
  description: "Bienvenido a la página de presupuesto",
};

const BudgetPage = () => {
  return (
    <section>
      <BudgetScreen />
    </section>
  );
};

export default BudgetPage;
