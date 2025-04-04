import styled from "styled-components";

export const BudgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;

  .total {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0.5rem;

    font-weight: 400;
    line-height: 1.5rem;

    span {
      font-weight: 700;
      line-height: 1.5rem;
    }
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 68vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-weight: 400;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  img {
    width: 50%;
    height: auto;
  }

  @media (max-width: 1440px) {
    height: 64vh;

    h3 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 1024px) {
    height: 60vh;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .empty-cart {
    text-align: right;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    text-decoration-line: underline;
    text-underline-position: from-font;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ContainerItems = styled.div`
  width: 100%;
  height: 68vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  overflow-y: auto;
  overflow-x: hidden;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.125rem;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.hoverGreen};
`;
