import styled from "styled-components";

export const FiltersWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 0.5rem;

  p {
    color: ${(props) => props.theme.colors.brandGreen};
    cursor: pointer;
    padding-block: 0.5rem;
  }

  .filters-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 0.75rem;
    cursor: pointer;

    img {
      width: 1rem;
    }
  }

  .container-filters {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0.5rem;
  }
`;
