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
import { useEffect } from "react";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/features/cartSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { showModal } from "@/store/features/modalSlice";
import { OfferType } from "@/types/Offers";

export default function useProducts() {
  const { t } = useTranslation(["products", "addProducts"]);

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

  useEffect(() => {
    if (!loading && plants.length < 1) getPlants(meta.query, meta.page, 25);
  }, []);

  const generateStrapiQuery = (query: QueryType) => {
    let strapiQuery = "";
    if (query.search) {
      strapiQuery += `filters[description][$containsi]=${encodeURIComponent(
        query.search
      )}`;
    }

    const formatValues = Object.values(query.format);
    if (formatValues.length > 0) {
      formatValues.forEach((value, index) => {
        strapiQuery += `${
          strapiQuery ? "&" : ""
        }filters[$or][${index}][pot_size][$containsi]=${encodeURIComponent(
          value
        )}`;
      });
    }

    return strapiQuery;
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
        `/api/strapi/plants?pagination[pageSize]=${pageSize}&pagination[page]=${newPage}&${strapiQuery}&fields[0]=genus&fields[1]=description&fields[2]=pot_size&fields[3]=height&fields[4]=price`
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
      getPlants(newQuery, 1, 25);
    }
  };

  const getScrollPlants = async () => {
    if (meta.total > plants.length && !loading) {
      dispatch(setPageScroll());
      await getPlants(meta.query, meta.page + 1, 25);
    }
  };

  const handleAddToCart = (plant: PlantType | OfferType) => {
    if (items.find((item) => item.id === plant.id)) {
      Toast.fire({
        icon: "error",
        title: data.errorAddToCart.title,
      });
      return;
    }
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

  const generateColumns = () => [
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
      cell: (info) => `${info.getValue()} €`,
    }),
    columnHelper.display({
      id: "add",
      cell: (info) => {
        const plant = info.row.original;
        return <AddToCart onClick={() => handleAddToCart(plant)} />;
      },
    }),
  ];

  return {
    plants,
    loading,
    query,
    data,
    dataAddProduct,
    getScrollPlants,
    generateColumns,
    handleFilter,
    handleAddToCart,
    addCostumPlant,
  };
}
