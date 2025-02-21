import styled from "styled-components";

export const HeroWrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;

  @media (max-width: 1024px) {
    height: auto;
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 2rem;
    padding-top: 6rem;
  }

  @media (max-width: 768px) {
    padding-top: 4rem;
    gap: 1.5rem;
  }
`;

export const ContainerImages = styled.div`
  width: 50%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;

  @media (max-width: 1024px) {
    width: 100%;
    height: 10rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: none;
  }

  @media (max-width: 768px) {
    height: 20rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

export const ContainerData = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  p {
    color: ${(props) => props.theme.colors.dark};
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.75rem;

    span {
      color: ${(props) => props.theme.colors.brandGreen};
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    align-items: flex-start;

    p {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 768px) {
    p {
      font-size: 1.4rem;
    }
  }
`;
