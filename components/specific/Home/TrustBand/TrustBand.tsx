"use client";

import React from "react";
import { StatItem, TrustBandInner, TrustBandWrapper } from "./TrustBand.style";
import { StatType } from "@/types/Home";

/**
 * Full-bleed dark band directly under the hero. Answers "can these people
 * actually supply my project?" before the visitor has to scroll for it.
 */
const TrustBand = ({ stats }: { stats: StatType[] }) => {
  if (!stats.length) return null;

  return (
    <TrustBandWrapper className="bleed">
      <TrustBandInner>
        {stats.map((stat) => (
          <StatItem key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </StatItem>
        ))}
      </TrustBandInner>
    </TrustBandWrapper>
  );
};

export default TrustBand;
