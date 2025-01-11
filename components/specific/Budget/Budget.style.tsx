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

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
