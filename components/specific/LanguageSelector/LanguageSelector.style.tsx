import styled from "styled-components";

export const LanguageSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.creamLight};
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;

export const BudgetContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.creamLight};
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hoverGreen};
  }
`;
