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

  .container-arrow {
    display: flex;
    width: 2rem;
    height: 2rem;
    padding: 0.4rem;
    justify-content: center;
    align-items: center;
    border-radius: 1.25rem;
    background-color: ${(props) => props.theme.colors.lightGreen};
    cursor: pointer;
  }
`;

export const ContainerCards = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin: auto;
  display: flex;
`;

export const CarouselInner = styled.div`
  display: flex;
  position: absolute;
  gap: 10px;
  left: 0;
  transition: 0.3s ease-in-out;
`;
