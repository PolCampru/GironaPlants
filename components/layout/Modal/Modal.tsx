"use client";

import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useUiLabels from "@/hooks/useUiLabels";

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;

  background-color: rgba(10, 42, 53, 0.55);
`;

const Dialog = styled.div`
  position: relative;
  width: min(34rem, 100%);
  max-height: calc(100dvh - 2.5rem);
  overflow-y: auto;

  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.panel};
  box-shadow: ${({ theme }) => theme.shadow.lg};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 2.25rem;
  height: 2.25rem;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.paper};
  }
`;

export const Modal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => {
  const labels = useUiLabels();

  // Escape closes it and the page behind stops scrolling — neither worked
  // before, and the old close control was an <a> with no href or label.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal]);

  return (
    <Scrim
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <Dialog role="dialog" aria-modal="true">
        <CloseButton type="button" onClick={closeModal} aria-label={labels.close}>
          <FiX aria-hidden="true" size={18} />
        </CloseButton>
        {children}
      </Dialog>
    </Scrim>
  );
};

export default Modal;
