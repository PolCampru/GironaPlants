"use client";

import React from "react";
import Link from "next/link";
import { CrumbCurrent, CrumbItem, CrumbList, CrumbNav } from "./Catalogue.style";

export type Crumb = { name: string; href?: string };

/**
 * Visible breadcrumbs. The matching BreadcrumbList JSON-LD is emitted by the
 * page itself — Google wants both, and only the visible trail gives a visitor
 * arriving from a search a way back up into the catalogue.
 */
const Breadcrumbs = ({ items, label }: { items: Crumb[]; label: string }) => (
  <CrumbNav aria-label={label}>
    <CrumbList>
      {items.map((item) => (
        <CrumbItem key={item.name}>
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <CrumbCurrent aria-current="page">{item.name}</CrumbCurrent>
          )}
        </CrumbItem>
      ))}
    </CrumbList>
  </CrumbNav>
);

export default Breadcrumbs;
