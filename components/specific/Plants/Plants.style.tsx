import styled from "styled-components";
import { motion } from "framer-motion";

export const PlantsWrapper = styled.div`
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2.8rem;

  .title-container {
    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    gap: 1rem;
  }
`;

export const ContainerGlobal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1.5%;
  position: relative;
`;

export const ContainerFilters = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;

  .container-filters {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const ContainerProducts = styled.div`
  width: 84%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: ${(props) => props.theme.colors.gray};
`;

export const FilterToggleButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.creamLight};

  img {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const FilterOverlay = styled(motion.div)`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9998;
  }
`;

export const FilterMenuMobile = styled(motion.div)`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background-color: #fff;
    z-index: 9999;
    box-shadow: -2px 0 6px rgba(0, 0, 0, 0.15);
  }
`;

export const FilterContent = styled.div`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .container-filters {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    margin-bottom: 1rem;

    p {
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  margin-bottom: 1rem;
`;
