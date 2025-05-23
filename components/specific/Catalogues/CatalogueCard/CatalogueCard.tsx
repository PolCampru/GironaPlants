"use client";

import React from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";

interface CatalogueCardProps {
  title: string;
  description: string;
  imageUrl: string;
  button: string;
  catalogue?: string;
}

const CatalogueCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 1.25rem;
  max-width: 30%;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    max-width: 45%;

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    h3 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const ContainerImage = styled.div<{ $clickable: boolean }>`
  width: 100%;
  height: 100%;
  padding-right: 30%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
    transition: transform 0.3s ease;

    ${({ $clickable }) =>
      $clickable &&
      `
      &:hover {
        transform: scale(1.05) rotate(2deg);
        box-shadow: 0 4px 8px 5px rgba(0, 0, 0, 0.2);
      }
    `}
  }

  @media (max-width: 1024px) {
    padding-right: 20%;
  }

  @media (max-width: 768px) {
    padding-right: 0%;
  }
`;

const CatalogueCard = ({
  title,
  description,
  imageUrl,
  button,
  catalogue,
}: CatalogueCardProps) => {
  const isClickable = !!catalogue;

  return (
    <CatalogueCardWrapper>
      <ContainerImage $clickable={isClickable}>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          onClick={() => isClickable && window.open(catalogue, "_blank")}
        />
      </ContainerImage>

      <h3>{title}</h3>
      <p>{description}</p>

      {catalogue && (
        <a href={catalogue} target="_blank" rel="noopener noreferrer">
          <Button>{button}</Button>
        </a>
      )}
    </CatalogueCardWrapper>
  );
};

export default CatalogueCard;
