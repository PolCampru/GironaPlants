"use client";

import React from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { CatalogueRow } from "@/lib/catalogue";
import type { CatalogueCopy } from "@/data/catalogueContent";
import AddRowToQuote from "./AddRowToQuote";
import { Table, TableNote, TableScroll } from "./Catalogue.style";

type ReferenceTableProps = {
  rows: CatalogueRow[];
  locale: string;
  copy: CatalogueCopy["table"];
  /** Genus pages show which species each row belongs to; species pages don't. */
  speciesHref?: (row: CatalogueRow) => string | null;
  showSpecies?: boolean;
};

/**
 * The pot sizes, heights and prices held for a set of catalogue rows, as real
 * HTML. This is the content that makes these pages worth indexing, so it is
 * rendered on the server — unlike the /products table, which is a client-side
 * view over a paginated fetch and shows search engines an empty tbody.
 */
/** Blank in the catalogue means "not recorded", and reads as a gap otherwise. */
const cell = (value: string | null | undefined) =>
  value && value.trim() ? value : "—";

const ReferenceTable = ({
  rows,
  locale,
  copy,
  speciesHref,
  showSpecies = false,
}: ReferenceTableProps) => (
  <>
    <TableScroll>
      <Table>
        <thead>
          <tr>
            {showSpecies && <th scope="col">{copy.species}</th>}
            <th scope="col">{copy.potSize}</th>
            <th scope="col">{copy.height}</th>
            <th scope="col">{copy.price}</th>
            <th scope="col" className="action">
              <span className="visually-hidden">{copy.addLabel}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const href = speciesHref?.(row) ?? null;

            return (
              <tr key={row.id}>
                {showSpecies && (
                  <td>
                    {href ? (
                      <Link href={href}>
                        <em>{row.description}</em>
                      </Link>
                    ) : (
                      <em>{row.description}</em>
                    )}
                  </td>
                )}
                <td>{cell(row.pot_size)}</td>
                <td>{cell(row.height)}</td>
                <td className="price">{formatPrice(row.price, locale) || "—"}</td>
                <td className="action">
                  <AddRowToQuote row={row} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableScroll>
    <TableNote>{copy.note}</TableNote>
  </>
);

export default ReferenceTable;
