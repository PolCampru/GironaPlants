import styled from "styled-components";

export const HeroWrapper = styled.div`
  height: 83vh;
  width: 100%;
  margin-top: 14vh;
  margin-bottom: 3vh;
  padding: 8% 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  background-color: ${(props) => props.theme.colors.creamLight};

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    margin-top: 10vh;
    padding: 8% 5%;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    margin-top: 14lvh;
    padding: 6% 3%;
    gap: 2rem;
  }
`;

export const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 4px 8px 5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    width: 80%;
    height: auto;
    img {
      height: auto;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  width: 60%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    width: 80%;
    align-items: center;
    text-align: center;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }
`;
