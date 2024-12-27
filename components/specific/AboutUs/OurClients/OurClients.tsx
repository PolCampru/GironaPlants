"use client";

import { OurClientsProps } from "@/types/AboutUs";
import {
  ClientCart,
  ContainerClients,
  ContainerTitle,
  OurClientsWrapper,
} from "./OurClients.style";
import Title from "@/components/ui/Title/Title";

const OurClients = ({ data }: { data: OurClientsProps }) => {
  console.log(data);
  return (
    <OurClientsWrapper>
      <ContainerTitle>
        <Title title={data.our_clients.title} />
        <p>{data.our_clients.subtitle}</p>
      </ContainerTitle>
      <ContainerClients>
        {data.our_clients.clients.map((client) => (
          <ClientCart key={client.name}>
            <img src={client.image} alt={client.name} />
            <p>{client.name}</p>
          </ClientCart>
        ))}
      </ContainerClients>
    </OurClientsWrapper>
  );
};

export default OurClients;
