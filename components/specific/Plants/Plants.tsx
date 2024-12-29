"use client";

import useProducts from "@/hooks/useProducts";
import { PlantType } from "@/types/Products";
import { PlantsWrapper } from "./Plants.style";
import Loader from "@/components/ui/Loader/Loader";
import Table from "@/components/layout/Table/Table";

export default function Plants() {
  const { plants, loading, getScrollPlants, generateColumns } = useProducts();

  return (
    <PlantsWrapper>
      {!plants ? (
        <Loader />
      ) : (
        <Table
          data={plants}
          columns={generateColumns()}
          loading={loading}
          refetch={getScrollPlants}
          onRowClick={() => console.log("Row clicked")}
        />
      )}
    </PlantsWrapper>
  );
}
