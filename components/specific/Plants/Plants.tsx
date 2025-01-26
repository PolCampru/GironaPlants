"use client";

import useProducts from "@/hooks/useProducts";
import {
  ContainerFilters,
  ContainerGlobal,
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
import Filters from "./Filters/Filters";
import AppliedFilters from "./AppliedFilters/AppliedFilters";
import { OffersDataType } from "@/types/Offers";
import { OffersCarousel } from "./ContainerOffers/ContainerOffers";

export default function Plants({ offersData }: { offersData: OffersDataType }) {
  const {
    plants,
    loading,
    query,
    data,
    dataAddProduct,
    getScrollPlants,
    generateColumns,
    handleAddToCart,
    handleFilter,
    addCostumPlant,
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
          {offersData && offersData.length > 0 && (
            <Checkbox
              label={data.filters.offersTitle}
              checked={query.offers}
              onChange={() => handleFilter("offers", !query.offers)}
              name="offers"
            />
          )}
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
          <ContainerSearch>
            <AppliedFilters
              filters={query}
              handleRemove={handleFilter}
              dataAddProduct={dataAddProduct}
              addPlant={addCostumPlant}
            />
          </ContainerSearch>
          <OffersCarousel
            query={query}
            data={data}
            offersData={offersData}
            handleAddToCart={handleAddToCart}
          />
          {!plants ? (
            <Loader />
          ) : (
            <Table
              data={plants}
              columns={generateColumns()}
              loading={loading}
              refetch={getScrollPlants}
            />
          )}
        </ContainerProducts>
      </ContainerGlobal>
    </PlantsWrapper>
  );
}
