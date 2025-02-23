import styled from "styled-components";

export const BudgetScreenWrapper = styled.div`
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.75rem;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.125rem;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.hoverGreen};
`;

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Ajustado a 'start' para alinear la parte superior */
  gap: 1rem;

  /* ========== TABLET: <= 1024px ========== */
  @media (max-width: 1024px) {
    flex-direction: column; /* Form y budget uno debajo del otro */
    gap: 2rem; /* Más espacio entre secciones */
  }
`;

export const BudgetContainer = styled.div`
  width: 54%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.creamLight};
  padding: 1rem 2rem;
  border-radius: 0.625rem;

  /* ========== TABLET: <= 1024px ========== */
  @media (max-width: 1024px) {
    width: 100%;
    padding: 1rem; /* Reducción de padding en tablet */
  }

  /* ========== MOBILE: <= 768px ========== */
  @media (max-width: 768px) {
    padding: 1rem; /* o menos, según prefieras */
  }
`;

export const ContactContainer = styled.div`
  width: 44%;
  height: 100%;
  border-radius: 0.625rem;

  /* ========== TABLET: <= 1024px ========== */
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
