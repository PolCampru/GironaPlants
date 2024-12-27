import styled from "styled-components";

export const OurClientsWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  margin: 6rem 0;
`;

export const ContainerTitle = styled.div`
  width: 18%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1.31rem;

  p {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const ContainerClients = styled.div`
  width: 77%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export const ClientCart = styled.div`
  padding: 1.25rem;
  width: 18%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.25rem;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.creamLight};
  }
`;
