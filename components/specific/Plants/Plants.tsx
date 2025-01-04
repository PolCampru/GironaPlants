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
import { potSizeOptions } from "@/data/Products";
import Filters from "./Filters/Filters";

export default function Plants() {
  const {
    plants,
    loading,
    query,
    data,
    getScrollPlants,
    generateColumns,
    handleFilter,
  } = useProducts();

  if (!data.filters) return <Loader />;

  return (
    <PlantsWrapper>
      <Title title={data.title} />
      <ContainerGlobal>
        <ContainerFilters>
          <div className="container-filters">
            <img src="/images/products/filters.svg" alt="filters" />
            <p>{data.filters.title}</p>
          </div>
          <Search
            placeholder={data.filters.searchPlaceholder}
            onChange={(value) => handleFilter("search", value)}
            value={query.search}
          />
          <Checkbox
            label={data.filters.offersTitle}
            checked={query.offers}
            onChange={() => handleFilter("offers", !query.offers)}
            name="offers"
          />
          <HorizontalLine />
          <Filters
            options={data.filters.potFilters.options}
            data={query.format}
            onChange={handleFilter}
            title={data.filters.potFilters.title}
            seeAll={data.filters.potFilters.seeAll}
          />
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
