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
  }
`;

export const ContainerCatalogues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
