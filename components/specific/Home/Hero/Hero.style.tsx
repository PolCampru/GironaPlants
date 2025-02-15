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

  @media (max-width: 1440px) {
    gap: 2%;
  }

  @media (max-width: 1024px) {
    height: auto;
    flex-direction: column;
    gap: 30px;
  }
`;

export const ContainerImages = styled.div`
  width: 50%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media (max-width: 1440px) {
    height: 80%;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    height: 450px;
    width: 50%;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    height: 600px;
    width: 100%;
  }

  @media (max-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
    height: 350px;
  }
`;

export const ContainerData = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    span {
      color: ${(props) => props.theme.colors.brandGreen};
    }
  }

  p {
    color: ${(props) => props.theme.colors.dark};
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
    gap: 1%;

    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;
