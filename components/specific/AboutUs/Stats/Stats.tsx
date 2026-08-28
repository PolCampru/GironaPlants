"use client";

import React from "react";
import { StatItem, StatsPanel } from "./Stats.style";
import Section from "@/components/ui/Section/Section";
import { AboutUsStatsProps } from "@/types/AboutUs";

const Stats = ({ stats }: AboutUsStatsProps) => {
  if (!stats.length) return null;

  return (
    <Section>
      <StatsPanel>
        {stats.map((stat) => (
          <StatItem key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </StatItem>
        ))}
      </StatsPanel>
    </Section>
  );
};

export default Stats;
