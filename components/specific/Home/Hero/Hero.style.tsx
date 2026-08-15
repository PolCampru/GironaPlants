import styled from "styled-components";

export const HeroWrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  padding-top: 8rem;
  padding-bottom: 3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;

  @media (max-width: 1440px) {
    gap: 3%;
  }

  @media (max-width: 1024px) {
    min-height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    padding-top: 7rem;
  }
`;

export const ContainerImages = styled.div`
  width: 48%;
  height: 34rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.75rem;

  @media (max-width: 1440px) {
    height: 30rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 26rem;
  }

  @media (max-width: 425px) {
    height: 20rem;
    gap: 0.5rem;
  }
`;

export const ContainerData = styled.div`
  width: 52%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1.25rem;

  h1 {
    font-size: clamp(2rem, 3vw, 2.75rem);
    font-weight: 700;
    line-height: 1.15;
    color: ${(props) => props.theme.colors.dark};

    span {
      display: block;
      font-size: clamp(3rem, 5vw, 4.25rem);
      color: ${(props) => props.theme.colors.brandGreen};
    }
  }

  p {
    color: rgba(32, 23, 22, 0.75);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.6;
    max-width: 34rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1rem;
  border-radius: 62.5rem;

  background-color: ${(props) => props.theme.colors.creamLight};
  color: ${(props) => props.theme.colors.brandGreen};

  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const TrustList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.75rem;
  margin-top: 1.25rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(32, 23, 22, 0.7);

    svg {
      flex-shrink: 0;
      color: ${(props) => props.theme.colors.brandGreen};
    }
  }
`;
