"use client";

import { RootState } from "@/store";
import {
  initPlants,
  resetPageScroll,
  setLoading,
  setPageScroll,
  setQuery,
} from "@/store/features/plantsSlice";
import {
  AddProductType,
  Meta,
  PlantType,
  productsDataType,
  QueryType,
} from "@/types/Products";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/features/cartSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { showModal } from "@/store/features/modalSlice";
import { OfferType } from "@/types/Offers";
import { formatPrice } from "@/lib/format";
import { track } from "@/lib/analytics";
import { QuoteItemSource } from "@/types/Cart";
import useLocale from "@/hooks/useLocale";
import React from "react";

const PAGE_SIZE = 25;

/**
 * @param initialSearch term from the page's ?search= query, resolved on the
 *   server. Reading it here with useSearchParams() forced the whole products
 *   route out of static rendering (and needed a Suspense boundary); only the
 *   Plants component passes it, so the other consumers of this hook do not
 *   re-trigger the initial fetch.
 */
export default function useProducts(initialSearch?: string) {
  const { t } = useTranslation(["products", "addProducts"]);
  const locale = useLocale();

  const data = t("products", { returnObjects: true }) as productsDataType;
  const dataAddProduct = t("addProducts", {
    ns: "addProducts",
    returnObjects: true,
  }) as AddProductType;

  const { plants, meta, loading } = useSelector(
    (state: RootState) => state.plants
  );

  const query = meta.query;

  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const ownsInitialFetch = initialSearch !== undefined;
  const appliedInitialSearch = useRef(false);

  // The hero search box and the home page category cards link here with
  // ?search=<term>. Without this the term was in the URL and silently
  // ignored, so every one of those links landed on the unfiltered table.
  useEffect(() => {
    if (!ownsInitialFetch || appliedInitialSearch.current) return;
    appliedInitialSearch.current = true;

    if (initialSearch && initialSearch !== meta.query.search) {
      const newQuery = { ...meta.query, search: initialSearch };
      dispatch(resetPageScroll());
      dispatch(setQuery(newQuery));
      getPlants(newQuery, 1, PAGE_SIZE);
      return;
    }
    if (!loading && plants.length < 1) {
      getPlants(meta.query, meta.page, PAGE_SIZE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateStrapiQuery = (query: QueryType) => {
    // Every clause goes under its own $and slot so they intersect: the search
    // term matches genus OR description, and that result is then narrowed by
    // the selected formats. The previous version only ever searched
    // `description`, so searching a genus that is not repeated in the
    // description text returned nothing.
    const parts: string[] = [];
    let slot = 0;

    if (query.search) {
      // Shared with lib/plants.ts so the count on a home page category card
      // and the total on the page it links to are the same number.
      const term = encodeURIComponent(query.search);
      parts.push(`filters[$and][${slot}][$or][0][genus][$containsi]=${term}`);
      parts.push(
        `filters[$and][${slot}][$or][1][description][$containsi]=${term}`
      );
      slot += 1;
    }

    const formatValues = Object.values(query.format);
    if (formatValues.length > 0) {
      formatValues.forEach((value, index) => {
        parts.push(
          `filters[$and][${slot}][$or][${index}][pot_size][$containsi]=` +
            encodeURIComponent(value)
        );
      });
      slot += 1;
    }

    if (query.sort) parts.push(`sort=${encodeURIComponent(query.sort)}`);

    return parts.join("&");
  };

  const getPlants = async (
    query: QueryType,
    newPage: number,
    pageSize: number
  ) => {
    try {
      dispatch(setLoading(true));
      const strapiQuery = generateStrapiQuery(query);
      const response = await fetch(
        `/api/strapi/plants?pagination[pageSize]=${pageSize}&pagination[page]=${newPage}` +
          `&${strapiQuery}` +
          `&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=price`
      );
      const data = await response.json();

      const plants: PlantType[] = data.data.map((plant: PlantType) => ({
        id: plant.id,
        genus: plant.genus,
        description: plant.description,
        pot_size: plant.pot_size,
        height: plant.height,
        price: plant.price,
      }));

      const meta: Meta = {
        page: data.meta.pagination.page,
        pageCount: data.meta.pagination.pageCount,
        total: data.meta.pagination.total,
        query: data.meta.pagination.query,
      };

      dispatch(
        initPlants({
          data: plants,
          meta: meta,
        })
      );
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFilter = (
    name: keyof QueryType,
    value: string | boolean | Record<number, string>
  ) => {
    if (name !== "offers") dispatch(resetPageScroll());

    let newQuery = { ...meta.query };

    if (name === "search") {
      newQuery.search = value as string;
    } else if (name === "sort") {
      newQuery.sort = value as string;
    } else if (name === "offers") {
      newQuery.offers = !newQuery.offers;
    } else if (name === "format") {
      const selectedFormats = value as Record<number, string>;
      let currentFormats = { ...(newQuery.format ?? {}) } as Record<
        number,
        string
      >;

      for (const [key, val] of Object.entries(selectedFormats)) {
        if (currentFormats.hasOwnProperty(key)) {
          delete currentFormats[key as unknown as number];
        } else {
          currentFormats[key as unknown as number] = val;
        }
      }
      newQuery.format = currentFormats;
    }

    dispatch(setQuery(newQuery));

    if (name !== "offers") {
      getPlants(newQuery, 1, PAGE_SIZE);
    }
  };

  const getScrollPlants = async () => {
    if (meta.total > plants.length && !loading) {
      dispatch(setPageScroll());
      await getPlants(meta.query, meta.page + 1, PAGE_SIZE);
    }
  };

  const clearFilters = () => {
    const cleared: QueryType = {
      search: "",
      offers: false,
      format: {},
      sort: meta.query.sort,
    };
    dispatch(resetPageScroll());
    dispatch(setQuery(cleared));
    getPlants(cleared, 1, PAGE_SIZE);
  };

  /** Every add goes through here — the catalogue table, the offer cards and
   *  the custom-plant modal — so it is the one place the funnel is measured.
   *  `source` says which of the three it was. */
  const handleAddToCart = (
    plant: PlantType | OfferType,
    source: QuoteItemSource = "catalogue"
  ) => {
    if (items.find((item) => item.id === plant.id)) {
      Toast.fire({
        icon: "error",
        title: data.errorAddToCart.title,
      });
      return;
    }

    // Before the dispatch: `items` is this render's cart, so an empty one
    // means this add is what starts the quote.
    if (items.length === 0) track("quote_started", { source, locale });
    track("quote_item_added", { source, genus: plant.genus ?? "", locale });

    dispatch(
      addItem({
        id: plant.id,
        genus: plant.genus,
        description: plant.description,
        pot_size: plant.pot_size,
        height: plant.height,
        quantity: plant.quantity ? plant.quantity : 25,
        min_quantity: plant.quantity ? plant.quantity : 25,
        image: "images" in plant ? plant.images : undefined,
        oldPrice: "old_price" in plant ? plant.old_price : undefined,
        newPrice: "new_price" in plant ? plant.new_price : undefined,
        discount: "discount" in plant ? plant.discount : undefined,
      })
    );

    Toast.fire({
      icon: "success",
      title: data.successAddToCart.title,
    });
  };

  const addCostumPlant = () => {
    dispatch(showModal("addPlant"));
  };

  const columnHelper = createColumnHelper<PlantType>();

  const generateColumns = () => {
    // This component is SSR'd; window only exists after hydration.
    const windowWidth = typeof window === "undefined" ? 1280 : window.innerWidth;

    const addColumn = columnHelper.display({
      id: "add",
      cell: (info) => {
        const plant = info.row.original;
        return <AddToCart onClick={() => handleAddToCart(plant)} />;
      },
    });

    const standardColumns = [
      columnHelper.accessor("genus", {
        header: data.table.titleGenus,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: data.table.titleDescription,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("pot_size", {
        header: data.table.titlePotSize,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("height", {
        header: data.table.titleHeight,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: data.table.titlePrice,
        // Was `${value} €`, which printed "13.6 €" — a decimal point and one
        // decimal place, in locales that use a comma and two.
        cell: (info) => formatPrice(info.getValue(), locale),
      }),
    ];

    if (windowWidth < 850) {
      return [addColumn, ...standardColumns];
    }

    return [...standardColumns, addColumn];
  };

  return {
    plants,
    loading,
    query,
    data,
    dataAddProduct,
    total: meta.total,
    loaded: plants.length,
    getScrollPlants,
    generateColumns,
    handleFilter,
    handleAddToCart,
    addCostumPlant,
    clearFilters,
  };
}
