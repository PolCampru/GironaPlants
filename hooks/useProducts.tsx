"use client";

import { RootState } from "@/store";
import {
  initPlants,
  resetPageScroll,
  setLoading,
  setPageScroll,
  setQuery,
} from "@/store/features/plantsSlice";
import { Meta, PlantType, QueryType } from "@/types/Products";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/features/cartSlice";
import Swal from "sweetalert2";

export default function useProducts() {
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
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (!loading) getPlants(meta.query, meta.page, 25);
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
        }filters[$or][${index}][pot_size][$eq]=${encodeURIComponent(value)}`;
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
      console.log(error);
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

  const handleAddToCart = (plant: PlantType) => {
    if (items.find((item) => item.id === plant.id)) {
      Toast.fire({
        icon: "error",
        title: "Plant already in cart",
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
        quantity: 25,
      })
    );

    Toast.fire({
      icon: "success",
      title: "Plant added to cart",
    });
  };

  const columnHelper = createColumnHelper<PlantType>();

  const generateColumns = () => [
    columnHelper.accessor("genus", {
      header: "GENUS",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "DESCRIPTION",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pot_size", {
      header: "POT SIZE",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("height", {
      header: "HEIGHT",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "PRICE",
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
    getScrollPlants,
    generateColumns,
    handleFilter,
  };
}
