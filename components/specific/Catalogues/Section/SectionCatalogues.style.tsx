import styled from "styled-components";

export const SectionCataloguesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  padding: 3rem 0rem 6rem 0rem;

  h1 {
    color: ${(props) => props.theme.colors.brandGreen};
    font-size: 1.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    width: 40%;
    padding-bottom: 1.5rem;
    @media (max-width: 1024px) {
      width: 70%;
    }
    @media (max-width: 768px) {
      width: 100%;
      font-size: 1.5rem;
    }
  }
`;

export const ContainerCatalogues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    justify-content: center;
    > * {
      width: 100%;
      min-width: 250px;
    }
  }

  @media (max-width: 768px) {
    > * {
      width: 100%;
    }
  }
`;
