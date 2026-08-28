"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import useLocale from "@/hooks/useLocale";
import { navHref } from "@/data/navigation";
import type { QuoteCopy } from "@/data/budgetContent";
import { EmptyActions, EmptyText, EmptyWrapper } from "./EmptyQuote.style";

/** Three pots, one with a sprig: drawn rather than shipped as a PNG, so it
 *  scales and picks up the brand colours. */
const Illustration = ({ compact }: { compact: boolean }) => (
  <svg
    data-illustration
    width={compact ? 132 : 196}
    viewBox="0 0 196 120"
    fill="none"
    aria-hidden="true"
  >
    <ellipse cx="98" cy="110" rx="80" ry="7" fill="#F0EBE1" />
    <path
      d="M18 62h44l-4.5 40a5 5 0 0 1-5 4.4H27.5a5 5 0 0 1-5-4.4L18 62z"
      fill="#FAF7F0"
      stroke="#E7E2D8"
      strokeWidth="2"
    />
    <path d="M15 54h50v8H15z" fill="#FAF7F0" stroke="#E7E2D8" strokeWidth="2" />
    <path
      d="M134 62h44l-4.5 40a5 5 0 0 1-5 4.4h-25a5 5 0 0 1-5-4.4L134 62z"
      fill="#FAF7F0"
      stroke="#E7E2D8"
      strokeWidth="2"
    />
    <path
      d="M131 54h50v8h-50z"
      fill="#FAF7F0"
      stroke="#E7E2D8"
      strokeWidth="2"
    />
    <path
      d="M74 52h48l-5 50a6 6 0 0 1-6 5.4H85a6 6 0 0 1-6-5.4L74 52z"
      fill="#FFFFFF"
      stroke="#D5CEC2"
      strokeWidth="2.4"
    />
    <path
      d="M70 43h56v9H70z"
      fill="#FFFFFF"
      stroke="#D5CEC2"
      strokeWidth="2.4"
    />
    <path
      d="M98 43c0-13 7-20 20-22-2 15-8 22-20 22z"
      fill="#DCF0DF"
      stroke="#118B50"
      strokeWidth="2.4"
    />
    <path
      d="M98 43c0-9-5-14-14-16 2 11 5 16 14 16z"
      fill="#DCF0DF"
      stroke="#118B50"
      strokeWidth="2.4"
    />
    <path d="M98 43V25" stroke="#118B50" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const EmptyQuote = ({
  copy,
  compact = false,
  onAddManually,
  onNavigate,
}: {
  copy: QuoteCopy;
  compact?: boolean;
  onAddManually?: () => void;
  /** Closes the navbar drawer, which is fixed and would otherwise stay over
   *  the catalogue after this link navigates. */
  onNavigate?: () => void;
}) => {
  const locale = useLocale();

  return (
    <EmptyWrapper $compact={compact}>
      <Illustration compact={compact} />

      <EmptyText>
        <h3>{copy.emptyTitle}</h3>
        <p>{copy.emptyLead}</p>
      </EmptyText>

      <EmptyActions>
        <Link
          className="primary"
          href={navHref(locale, "products")}
          onClick={onNavigate}
        >
          {copy.emptyCta}
          <FiArrowRight aria-hidden="true" size={17} />
        </Link>
        {!compact && onAddManually && (
          <button className="secondary" type="button" onClick={onAddManually}>
            <FiPlus aria-hidden="true" size={16} />
            {copy.addButton}
          </button>
        )}
      </EmptyActions>
    </EmptyWrapper>
  );
};

export default EmptyQuote;
