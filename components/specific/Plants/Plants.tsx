"use client";

import useProducts from "@/hooks/useProducts";
import {
  ContainerFilters,
  ContainerGlobal,
  ContainerOffers,
  ContainerProducts,
  ContainerSearch,
  HorizontalLine,
  PlantsWrapper,
} from "./Plants.style";
import Loader from "@/components/ui/Loader/Loader";
import Table from "@/components/layout/Table/Table";
import Title from "@/components/ui/Title/Title";
import Search from "@/components/ui/Search/Search";
import Checkbox from "@/components/ui/CheckBox/CheckBox";

export default function Plants() {
  const {
    plants,
    loading,
    getScrollPlants,
    generateColumns,
    searchByDescription,
  } = useProducts();

  return (
    <PlantsWrapper>
      <Title title="Productes" />
      <ContainerGlobal>
        <ContainerFilters>
          <div className="container-filters">
            <img src="/images/products/filters.svg" alt="filters" />
            <p>Filtres</p>
          </div>
          <Search
            placeholder="Cerca..."
            onSearch={(value) => searchByDescription(value)}
          />
          <Checkbox
            label="Ofertes"
            checked={false}
            onChange={() => console.log("change")}
            name="offers"
          />
          <HorizontalLine />
        </ContainerFilters>
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
