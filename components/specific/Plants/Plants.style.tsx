import styled from "styled-components";

export const PlantsWrapper = styled.div`
  height: 100vh;
  width: 100%;

  padding-top: 8rem;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: start;

  gap: 3%;
`;

export const ContainerGlobal = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1.5%;
`;

export const ContainerFilters = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  .container-filters {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

export const ContainerProducts = styled.div`
  width: 84%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const ContainerOffers = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: ${(props) => props.theme.colors.gray};
`;
