"use client";

import React from "react";
import type { IconType } from "react-icons";
import {
  LuApple,
  LuBuilding2,
  LuDroplets,
  LuLandmark,
  LuPencilRuler,
  LuShovel,
  LuSprout,
  LuStore,
  LuTrees,
  LuTruck,
} from "react-icons/lu";
import { ClientCard, ClientIcon, ClientsGrid } from "./OurClients.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";
import { OurClientsProps } from "@/types/AboutUs";

/**
 * Inline icons instead of the ten SVG files under /images/aboutUs. next/image
 * is configured with `dangerouslyAllowSVG: false`, so those never rendered
 * through the optimizer, and they carried no shared stroke weight or grid.
 */
const ICONS: Record<string, IconType> = {
  nurseries: LuSprout,
  garden: LuStore,
  gardeners: LuShovel,
  public: LuBuilding2,
  sustainable: LuDroplets,
  landscapers: LuPencilRuler,
  distributors: LuTruck,
  fruit: LuApple,
  administrations: LuLandmark,
  reforestation: LuTrees,
};

const OurClients = ({ data }: { data: OurClientsProps }) => (
  <Section>
    <SectionHeading
      label={data.our_clients.title}
      title={data.our_clients.headline}
      lead={data.our_clients.subtitle}
    />

    <ClientsGrid>
      {data.our_clients.clients.map((client) => {
        const Icon = ICONS[client.icon ?? ""] ?? LuSprout;
        return (
          <ClientCard key={client.name}>
            <ClientIcon>
              <Icon aria-hidden="true" size={21} />
            </ClientIcon>
            <h3>{client.name}</h3>
            <p>{client.description}</p>
          </ClientCard>
        );
      })}
    </ClientsGrid>
  </Section>
);

export default OurClients;
