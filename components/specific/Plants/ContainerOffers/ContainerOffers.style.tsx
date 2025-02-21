import styled from "styled-components";

export const ContainerOffers = styled.div<{ $open: boolean }>`
  width: 100%;
  height: ${(props) => (props.$open ? "21rem" : "0rem")};
  opacity: ${(props) => (props.$open ? "1" : "0")};
  transition: all 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  p {
    color: ${(props) => props.theme.colors.brandGreen};
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-right: 1.5rem;
  }

  @media (max-width: 1024px) {
    > div {
      display: none;
    }
  }
`;

export const ContainerArrow = styled.div<{ $isActive?: boolean }>`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  transition: 0.3s ease-in-out;

  background-color: ${(props) =>
    props.$isActive ? props.theme.colors.lightGreen : props.theme.colors.gray};

  filter: ${(props) => (props.$isActive ? "none" : "grayscale(1)")};
  cursor: pointer;
`;

export const ContainerCards = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin: auto;
  display: flex;

  @media (max-width: 1024px) {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    display: block;
  }
`;

export const CarouselInner = styled.div`
  display: flex;
  position: absolute;
  gap: 0.625rem;
  left: 0;
  transition: 0.3s ease-in-out;

  @media (max-width: 1024px) {
    left: auto;
  }
`;
