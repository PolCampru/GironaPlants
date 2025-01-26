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
`;
