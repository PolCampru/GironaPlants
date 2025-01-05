import { motion } from "framer-motion";
import { styled } from "styled-components";

export const CarouselContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
`;

export const CarouselImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;

  transition: transform 0.3s ease;
  ${CarouselContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  background-color: ${({ $active }) => ($active ? "#ffffff" : "#888888")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;

  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #118b50;
    transform: rotate(90deg);
  }
`;

export const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

export const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;
