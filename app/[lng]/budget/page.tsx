import BudgetScreen from "@/components/specific/BudgetScreen/BudgetScreen";
import React from "react";

export const metadata = {
  title: "GironaPlants Budget",
  description: "Bienvenido a la página de presupuesto",
};

const BudgetPage = () => {
  return (
    <main>
      <BudgetScreen />
    </main>
  );
};

export default BudgetPage;
