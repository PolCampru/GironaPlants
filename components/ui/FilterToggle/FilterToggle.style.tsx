import styled from "styled-components";

const FilterToggleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  padding: 1px 10px;
  min-height: 40px;
  max-height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.lightGray};
  gap: 5px;

  .filter {
    display: flex;
    padding: 0.4rem 0.6rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    border-radius: 0.4375rem;

    cursor: pointer;

    color: ${(props) => props.theme.colors.mediumGray};

    transition: background 0.3s ease;

    &:hover {
      background: ${(props) => props.theme.colors.hoverGreen};
    }
  }

  .selected {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.dark};
    transition: background 0.3s ease;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.colors.white};
    }
  }
`;

export { FilterToggleWrapper };
