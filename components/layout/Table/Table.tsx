import React, { useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";

import { TableWrapper } from "./Table.style";
import Loader from "@/components/ui/Loader/Loader";
import EmptyState from "./EmptyState";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading: boolean;
  refetch: () => void;
  onRowClick?: (row: T) => void;
}

function Table<T>({
  data,
  columns,
  loading,
  refetch,
  onRowClick,
}: TableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLTableRowElement>(null);

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          refetch();
        }
      },
      { root: null, threshold: 0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, refetch]);

  return (
    <TableWrapper
      id="table-container"
      ref={tableContainerRef}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table>
        <thead className="header-table">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          <AnimatePresence>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.1 }}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>

          <tr ref={observerRef} className="trigger">
            <td>{loading && <Loader size={20} />}</td>
          </tr>
        </tbody>
      </table>

      {data.length === 0 && !loading && <EmptyState />}
    </TableWrapper>
  );
}

export default Table;
