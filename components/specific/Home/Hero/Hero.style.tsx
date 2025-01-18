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
`;

export const ContainerImages = styled.div`
  width: 50%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
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
`;
