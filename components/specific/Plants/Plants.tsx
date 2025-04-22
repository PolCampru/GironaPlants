"use client";

import { useState } from "react";
import useProducts from "@/hooks/useProducts";
import {
  ContainerFilters,
  ContainerGlobal,
  ContainerProducts,
  ContainerSearch,
  HorizontalLine,
  PlantsWrapper,
  FilterToggleButton,
  FilterMenuMobile,
  FilterContent,
  FilterOverlay,
  CloseButton,
} from "./Plants.style";
import { IoClose } from "react-icons/io5";
import Loader from "@/components/ui/Loader/Loader";
import Table from "@/components/layout/Table/Table";
import Title from "@/components/ui/Title/Title";
import Search from "@/components/ui/Search/Search";
import Checkbox from "@/components/ui/CheckBox/CheckBox";
import Filters from "./Filters/Filters";
import AppliedFilters from "./AppliedFilters/AppliedFilters";
import { OffersDataType } from "@/types/Offers";
import { OffersCarousel } from "./ContainerOffers/ContainerOffers";
import Image from "next/image";

export default function Plants({ offersData }: { offersData: OffersDataType }) {
  const [showFilters, setShowFilters] = useState(false);

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

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  return (
    <PlantsWrapper>
      <div className="title-container">
        <Title title={data.title} />
        <FilterToggleButton onClick={toggleFilters}>
          <Image
            src="/images/products/filters.svg"
            alt="filters"
            width={24}
            height={24}
          />
        </FilterToggleButton>
      </div>

      <ContainerGlobal>
        <ContainerFilters>
          <div className="container-filters">
            <Image
              src="/images/products/filters.svg"
              alt="filters"
              width={24}
              height={24}
            />
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

        {showFilters && (
          <FilterOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFilters}
          />
        )}

        <FilterMenuMobile
          initial={{ x: "100%" }}
          animate={{ x: showFilters ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FilterContent>
            <CloseButton onClick={closeFilters}>
              <IoClose size={24} />
            </CloseButton>

            <div className="container-filters">
              <Image
                src="/images/products/filters.svg"
                alt="filters"
                width={24}
                height={24}
              />
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
          </FilterContent>
        </FilterMenuMobile>

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
              emptyStateFunction={() => addCostumPlant()}
            />
          )}
        </ContainerProducts>
      </ContainerGlobal>
    </PlantsWrapper>
  );
}
