import styled from "styled-components";

export const EmptyStateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;

  @media (max-width: 1024px) {
    height: auto;
    flex-direction: column;
    gap: 30px;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export const EmptyStateContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 2rem;

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

export const EmptyStateTitle = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};

  span {
    color: ${({ theme }) => theme.colors.brandGreen};
  }

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const EmptyStateDescription = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.4;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
  }
`;

export const StyledButton = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  min-width: 200px;
  border: 2px solid ${({ theme }) => theme.colors.brandGreen};

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background-color: ${theme.colors.brandGreen};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.brandGreenDark};
      border-color: ${theme.colors.brandGreenDark};
    }
  `
      : `
    background-color: transparent;
    color: ${theme.colors.brandGreen};
    &:hover {
      background-color: ${theme.colors.brandGreenLight};
    }
  `}

  @media (max-width: 1024px) {
    width: 100%;
    font-size: 1.1rem;
  }
`;
