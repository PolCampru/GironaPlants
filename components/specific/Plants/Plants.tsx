"use client";

import useProducts from "@/hooks/useProducts";
import {
  ContainerFilters,
  ContainerGlobal,
  ContainerOffers,
  ContainerProducts,
  ContainerSearch,
  PlantsWrapper,
} from "./Plants.style";
import Loader from "@/components/ui/Loader/Loader";
import Table from "@/components/layout/Table/Table";
import Title from "@/components/ui/Title/Title";

export default function Plants() {
  const { plants, loading, getScrollPlants, generateColumns } = useProducts();

  return (
    <PlantsWrapper>
      <Title title="Productes" />
      <ContainerGlobal>
        <ContainerFilters>Aquí van els filtres</ContainerFilters>
        <ContainerProducts>
          <ContainerSearch>Aquí van els filtres aplicats</ContainerSearch>
          <ContainerOffers>Aquí van les ofertes</ContainerOffers>
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
        </ContainerProducts>
      </ContainerGlobal>
    </PlantsWrapper>
  );
}
