import styled from "styled-components";

export const CataloguesWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;

  margin-inline: auto;
  margin-bottom: 5rem;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

export const ContainerInfo = styled.div`
  width: 40%;

  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.dark};
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
