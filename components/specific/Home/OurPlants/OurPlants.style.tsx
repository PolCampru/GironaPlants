import styled, { css } from "styled-components";
import Link from "next/link";

export const OurPlantsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 0;
  margin-bottom: 3rem;

  h2 {
    max-width: 40rem;
    margin-top: 1rem;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const PlantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  width: 100%;
  margin-top: 1.5rem;
`;

export const PlantCard = styled(Link)<{
  $image?: string;
  $tone: "cream" | "green";
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;

  height: 17.5rem;
  padding: 1.5rem;

  border-radius: 1rem;
  border-top-left-radius: 3rem;
  overflow: hidden;

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  ${({ $image, $tone, theme }) =>
    $image
      ? css`
          background: linear-gradient(
              180deg,
              rgba(10, 42, 53, 0.05) 30%,
              rgba(10, 42, 53, 0.82) 100%
            ),
            url(${$image}) center / cover no-repeat;
          color: ${theme.colors.white};

          p {
            color: rgba(255, 255, 255, 0.85);
          }
        `
      : css`
          background-color: ${$tone === "green"
            ? theme.colors.lightGreen
            : theme.colors.creamLight};
          color: ${theme.colors.dark};

          p {
            color: rgba(32, 23, 22, 0.7);
          }
        `}

  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.2;
    padding-right: 3rem;
  }

  p {
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.5;
    padding-right: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(10, 42, 53, 0.18);
  }
`;

export const CardArrow = styled.span`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};

  transition: transform 0.25s ease;

  ${PlantCard}:hover & {
    transform: translateX(4px);
  }
`;

export const SectionFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;
