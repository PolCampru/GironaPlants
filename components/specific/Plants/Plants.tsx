"use client";

import { AppDispatch, RootState } from "@/store";
import { initPlants } from "@/store/features/plantsSlice";
import { PlantType } from "@/types/Products";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ClientProductsProps {
  data: PlantType[];
}

export default function ClientProducts({ data }: ClientProductsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const plants = useSelector((state: RootState) => state.plants.data);

  useEffect(() => {
    dispatch(initPlants(data));
  }, [dispatch, data]);

  if (!plants?.length) {
    return <p>No plants found!</p>;
  }

  return (
    <div>
      <h1>Products (SSR + Redux)</h1>
      <p>Welcome to the products page!</p>
      <hr />

      <ul>
        {plants.map((plant: PlantType) => (
          <li key={plant.id}>
            <strong>{plant.genus}</strong>
            <div>{plant.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
