import Button from "@/components/ui/Button/Button";
import React from "react";
import styled from "styled-components";

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
        <img
          src={imageUrl}
          alt={title}
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
