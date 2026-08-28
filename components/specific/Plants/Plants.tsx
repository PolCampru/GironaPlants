"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiSliders, FiX } from "react-icons/fi";
import useProducts from "@/hooks/useProducts";
import {
  ActiveDot,
  ClearButton,
  CloseButton,
  ContainerFilters,
  ContainerGlobal,
  ContainerProducts,
  DrawerHead,
  FilterContent,
  FilterMenuMobile,
  FilterOverlay,
  FilterToggleButton,
  FiltersHead,
  HeadAside,
  HeadText,
  HorizontalLine,
  Label,
  PageHead,
  PlantsWrapper,
  ResultsBar,
  ResultsCount,
  SortSelect,
} from "./Plants.style";
import Loader from "@/components/ui/Loader/Loader";
import Table from "@/components/layout/Table/Table";
import Search from "@/components/ui/Search/Search";
import Checkbox from "@/components/ui/CheckBox/CheckBox";
import Filters from "./Filters/Filters";
import AppliedFilters from "./AppliedFilters/AppliedFilters";
import Button from "@/components/ui/Button/Button";
import useUiLabels from "@/hooks/useUiLabels";
import { OffersDataType } from "@/types/Offers";
import type { ProductsHeading } from "@/data/pageHeadings";
import { OffersCarousel } from "./ContainerOffers/ContainerOffers";

export default function Plants({
  offersData,
  locale,
  heading,
  initialSearch,
}: {
  offersData: OffersDataType;
  locale: string;
  heading: ProductsHeading;
  initialSearch: string;
}) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    plants,
    loading,
    query,
    data,
    total,
    loaded,
    getScrollPlants,
    generateColumns,
    handleAddToCart,
    handleFilter,
    addCostumPlant,
    clearFilters,
  } = useProducts(initialSearch);

  // total is 0 until the first page resolves; guard so the header never
  // renders "NaN resultados" on the way there.
  const labels = useUiLabels();
  const totalCount = Number.isFinite(total) ? total : 0;
  const activeCount =
    Object.keys(query.format ?? {}).length + (query.search ? 1 : 0);
  const numberFormat = new Intl.NumberFormat(
    locale === "en" ? "en-GB" : locale === "fr" ? "fr-FR" : "es-ES"
  );

  const pageHead = (
    <PageHead>
      <HeadText>
        <Label>{heading.label}</Label>
        {/* The count is the live total from Strapi, so the page states
            exactly how much is on offer instead of a bare "Productos". */}
        <h1>
          {totalCount > 0
            ? `${numberFormat.format(totalCount)} ${heading.title}`
            : heading.fallbackTitle}
        </h1>
        <p>{heading.lead}</p>
      </HeadText>

      <HeadAside>
        <span>{heading.askQuestion}</span>
        {/* A button, not a CtaLink with preventDefault — that version still
            navigated to /contact on cmd-click or "open in new tab". */}
        <Button variant="outline" size="md" onClick={addCostumPlant}>
          {heading.askButton}
        </Button>
      </HeadAside>
    </PageHead>
  );

  // The heading is server-rendered copy, so it ships in the HTML; only the
  // filters and the table wait for the i18n namespaces to load. The whole
  // page used to return a spinner until then, which meant /products had no
  // heading at all in the server response.
  if (!data?.filters) {
    return (
      <PlantsWrapper>
        {pageHead}
        <Loader />
      </PlantsWrapper>
    );
  }

  const filterPanel = (
    <>
      <FiltersHead>
        <p>
          <FiSliders aria-hidden="true" size={18} />
          {data.filters.title}
        </p>
        <ClearButton
          type="button"
          onClick={clearFilters}
          disabled={activeCount === 0}
        >
          {data.filters.clear}
        </ClearButton>
      </FiltersHead>

      <Search
        placeholder={data.filters.searchPlaceholder}
        onChange={(value) => handleFilter("search", value)}
        value={query.search}
        clearLabel={labels.clearSearch}
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
    </>
  );

  return (
    <PlantsWrapper>
      {pageHead}

      <ContainerGlobal>
        <ContainerFilters>{filterPanel}</ContainerFilters>

        <AnimatePresence>
          {showFilters && (
            <>
              <FilterOverlay
                key="filters-scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowFilters(false)}
              />
              <FilterMenuMobile
                key="filters-drawer"
                role="dialog"
                aria-modal="true"
                aria-label={data.filters.title}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <FilterContent>
                  <DrawerHead>
                    <p>{data.filters.title}</p>
                    <CloseButton
                      type="button"
                      onClick={() => setShowFilters(false)}
                      aria-label={labels.close}
                    >
                      <FiX aria-hidden="true" size={20} />
                    </CloseButton>
                  </DrawerHead>
                  {filterPanel}
                </FilterContent>
              </FilterMenuMobile>
            </>
          )}
        </AnimatePresence>

        <ContainerProducts>
          <ResultsBar>
            <ResultsCount aria-live="polite">
              <span>{numberFormat.format(totalCount)}</span>{" "}
              {totalCount === 1 ? data.resultsOne : data.resultsMany}
              {query.search && (
                <em>
                  {" "}
                  {data.resultsFor} «{query.search}»
                </em>
              )}
            </ResultsCount>

            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <FilterToggleButton
                type="button"
                onClick={() => setShowFilters(true)}
                aria-label={data.filters.title}
              >
                <FiSliders aria-hidden="true" size={16} />
                {data.filters.title}
                {activeCount > 0 && <ActiveDot>{activeCount}</ActiveDot>}
              </FilterToggleButton>

              <label>
                <span className="visually-hidden">{data.sortLabel}</span>
                <SortSelect
                  value={query.sort ?? "genus:asc"}
                  onChange={(event) => handleFilter("sort", event.target.value)}
                >
                  {data.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {data.sortLabel}: {option.label}
                    </option>
                  ))}
                </SortSelect>
              </label>
            </div>
          </ResultsBar>

          <AppliedFilters
            filters={query}
            handleRemove={handleFilter}
            offersLabel={data.filters.offersTitle}
            removeLabel={labels.remove}
          />

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
              footerNote={
                totalCount > 0
                  ? `${data.showing} ${numberFormat.format(loaded)} / ${numberFormat.format(totalCount)}`
                  : undefined
              }
            />
          )}
        </ContainerProducts>
      </ContainerGlobal>
    </PlantsWrapper>
  );
}
