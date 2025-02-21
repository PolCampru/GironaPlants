import styled from "styled-components";

export const BudgetNavbarWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
`;

export const AddPlantAndContinueWrapper = styled.div<{ $isDisabled: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .link {
    display: flex;
    width: 100%;
    height: 3.125rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    border: none;
    border-radius: 6.25rem;
    background-color: ${(props) =>
      props.$isDisabled
        ? props.theme.colors.gray
        : props.theme.colors.brandGreen};
    color: ${(props) => props.theme.colors.white};

    cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};

    transition: background-color 0.3s, color 0.3s, transform 0.3s;

    &:hover {
      background-color: ${(props) =>
        !props.$isDisabled && props.theme.colors.hoverGreen2};
      color: ${(props) => !props.$isDisabled && props.theme.colors.dark};
    }

    &:active {
      transform: ${(props) => !props.$isDisabled && "scale(0.98)"};
    }

    color: ${(props) => props.theme.colors.white};
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const AddPlant = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: ${({ theme }) => theme.colors.brandGreen};
    text-decoration: underline;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1440px) {
    flex-direction: column;
    text-align: center;
  }
`;
