"use client";

import { RootState } from "@/store";
import {
  initPlants,
  setLoading,
  setPageScroll,
} from "@/store/features/plantsSlice";
import { PlantType } from "@/types/Products";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useProducts() {
  const { plants, meta, loading } = useSelector(
    (state: RootState) => state.plants
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) getPlants(meta.query, meta.page, 25);
  }, []);

  const getPlants = async (
    query: string,
    newPage: number,
    pageSize: number
  ) => {
    try {
      dispatch(setLoading(true));
      console.log("Fetching plants...");
      const response = await fetch(
        `/api/strapi/plants?pagination[pageSize]=${pageSize}&pagination[page]=${newPage}&${query}`
      );
      const data = await response.json();

      dispatch(
        initPlants({
          data: data.data,
          meta: data.meta.pagination,
          query,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getScrollPlants = async () => {
    if (meta.total > plants.length && !loading) {
      dispatch(setPageScroll());
      await getPlants(meta.query, meta.page + 1, 25);
    }
  };

  const columnHelper = createColumnHelper<PlantType>();

  const generateColumns = () => [
    columnHelper.accessor("genus", {
      header: "Genus",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pot_size", {
      header: "Pot Size",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("height", {
      header: "Height",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => `${info.getValue()}€`,
    }),
  ];

  return { plants, loading, getScrollPlants, generateColumns };
}
