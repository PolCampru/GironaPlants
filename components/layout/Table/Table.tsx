"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  LoadMoreRow,
  TableCard,
  TableFooter,
  TableScroll,
} from "./Table.style";
import Loader from "@/components/ui/Loader/Loader";
import EmptyState from "./EmptyState";

interface TableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  loading: boolean;
  refetch: () => void;
  emptyStateFunction?: () => void;
  onRowClick?: (row: T) => void;
  /** e.g. "Showing 25 / 1,530". */
  footerNote?: string;
}

function Table<T>({
  data,
  columns,
  loading,
  refetch,
  emptyStateFunction,
  onRowClick,
  footerNote,
}: TableProps<T>) {
  // Kept in a ref so the observer always calls the current refetch without
  // having to tear itself down and rebuild on every render.
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;

  const observerRef = useRef<IntersectionObserver | null>(null);

  // A callback ref, not an effect on []: the sentinel only exists in the
  // non-empty branch, so a table that mounts empty (a search with no hits, or
  // a failed first fetch) would otherwise never get an observer at all, and
  // infinite scroll would stay dead for the rest of the session once rows
  // did appear.
  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) refetchRef.current();
      },
      { root: null, rootMargin: "240px", threshold: 0 }
    );
    observerRef.current.observe(node);
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isEmpty = data.length === 0 && !loading;

  return (
    <TableCard>
      {isEmpty ? (
        <EmptyState emptyStateFunction={emptyStateFunction} />
      ) : (
        <>
          <TableScroll>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} scope="col" data-col={header.column.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {/* No per-row enter animation: with infinite scroll it made
                    every appended page flicker in, and 1,500 animating rows
                    is a lot of work for no information. */}
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} onClick={() => onRowClick?.(row.original)}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} data-col={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sentinel sits outside the table so it is not an invalid
                absolutely-positioned <tr>, which is what it used to be. */}
            <LoadMoreRow ref={sentinelRef} aria-hidden={!loading}>
              {loading && <Loader size={20} />}
            </LoadMoreRow>
          </TableScroll>

          {footerNote && <TableFooter>{footerNote}</TableFooter>}
        </>
      )}
    </TableCard>
  );
}

export default Table;
