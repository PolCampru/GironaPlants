"use client";

import React from "react";
import {
  HeadingBlock,
  HeadingLabel,
  HeadingLead,
  HeadingTitle,
  HeadingRow,
} from "./SectionHeading.style";

type SectionHeadingProps = {
  /** Small uppercase eyebrow above the title. */
  label?: string;
  title: string;
  /** Supporting sentence under the title. */
  lead?: string;
  /**
   * Heading level. Defaults to h2 — only the page hero should be an h1, and
   * the old shared `Title` component rendered an h1 everywhere, so most pages
   * shipped three or four of them.
   */
  as?: "h1" | "h2";
  /** Right-hand slot, e.g. a "see all" link on a wide section header. */
  action?: React.ReactNode;
  size?: "md" | "lg";
};

const SectionHeading = ({
  label,
  title,
  lead,
  as = "h2",
  action,
  size = "lg",
}: SectionHeadingProps) => {
  const block = (
    <HeadingBlock>
      {label && <HeadingLabel>{label}</HeadingLabel>}
      <HeadingTitle as={as} $size={size}>
        {title}
      </HeadingTitle>
      {lead && <HeadingLead>{lead}</HeadingLead>}
    </HeadingBlock>
  );

  if (!action) return block;

  return (
    <HeadingRow>
      {block}
      {action}
    </HeadingRow>
  );
};

export default SectionHeading;
