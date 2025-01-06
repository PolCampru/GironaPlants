import styled from "styled-components";

export const BudgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
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
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ContainerItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  overflow-x: auto;
  padding-block: 1.8rem;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.125rem;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.hoverGreen};
`;
