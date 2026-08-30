"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddToCart from "@/components/ui/AddToCart/AddToCart";
import { addItem } from "@/store/features/cartSlice";
import { track } from "@/lib/analytics";
import type { RootState } from "@/store";
import type { CatalogueRow } from "@/lib/catalogue";
import useLocale from "@/hooks/useLocale";
import useUiLabels from "@/hooks/useUiLabels";

/**
 * One row of a genus or species page, added to the quote.
 *
 * Deliberately mirrors useProducts' handleAddToCart — same default of 25
 * units, same duplicate guard, same two Umami events — but tags the line
 * `species`, so the funnel can tell a quote that started on a landing page
 * from one that started in the catalogue table.
 */
const AddRowToQuote = ({ row }: { row: CatalogueRow }) => {
  const dispatch = useDispatch();
  const locale = useLocale();
  const labels = useUiLabels();
  const { items } = useSelector((state: RootState) => state.cart);

  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
  });

  const handleClick = () => {
    if (items.find((item) => item.id === row.id)) {
      toast.fire({ icon: "error", title: labels.alreadyInQuote });
      return;
    }

    if (items.length === 0) track("quote_started", { source: "species", locale });
    track("quote_item_added", { source: "species", genus: row.genus, locale });

    dispatch(
      addItem({
        id: row.id,
        genus: row.genus,
        description: row.description,
        pot_size: row.pot_size ?? undefined,
        height: row.height ?? undefined,
        quantity: 25,
        min_quantity: 25,
      })
    );

    toast.fire({ icon: "success", title: labels.addedToQuote });
  };

  return (
    <AddToCart
      onClick={handleClick}
      label={`${labels.addToQuote}: ${row.description} ${row.pot_size ?? ""}`.trim()}
    />
  );
};

export default AddRowToQuote;
