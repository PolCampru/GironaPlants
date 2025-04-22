import { ReactNode } from "react";

import styled from "styled-components";
import theme from "@/lib/theme";
import Image from "next/image";

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .pop-up-container {
    background-color: white;
    height: fit-content;
    width: fit-content;
    padding: 34px 60px 34px 60px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 20px;
    box-shadow: 0px 0px 0px 4px ${theme.colors.hoverGreen2};

    @media (max-width: 768px) {
      padding: 34px 20px 34px 20px;
      width: 90%;
    }
  }
`;

export const CrossWrapper = styled.a`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  z-index: 9999;
  justify-self: flex-start;
  align-self: flex-start;

  transition: transform 0.2s;
  &:hover {
    transform: rotate(90deg);
  }
`;

export const Modal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <ModalWrapper onClick={handleBackdropClick}>
      <div className="pop-up-container">
        {children}
        <CrossWrapper className="cross" onClick={() => closeModal()}>
          <Image
            src="/images/crossIcon.svg"
            alt="cross"
            width={24}
            height={24}
          />
        </CrossWrapper>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
