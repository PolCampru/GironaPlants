import styled from "styled-components";

export const AppliedFiltersWrapper = styled.div`
  width: 100%;
  min-height: 2.1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
`;

export const AddPlant = styled.div`
  margin-left: auto;
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
`;
