import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Image } from "@/types/Offers";
import {
  CarouselContainer,
  CarouselImage,
  DotsContainer,
  Dot,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalImage,
  NavigationButtons,
  NavButton,
} from "./ImageCarrousel.style";

type ImageCarrouselProps = {
  images: Image[];
};

const STRAPI_URL = "https://strapi.gironaplants.es";

function ImageCarrousel({ images }: ImageCarrouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <CarouselContainer>
      <AnimatePresence mode="popLayout">
        <CarouselImage
          key={images[currentIndex].url}
          src={STRAPI_URL + images[currentIndex].url}
          alt={`Slide ${currentIndex}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          onClick={openModal}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <DotsContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </DotsContainer>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close">
              &times;
            </CloseButton>
            <ModalImage
              src={STRAPI_URL + images[currentIndex].url}
              alt={`Enlarged slide ${currentIndex}`}
            />
            {images.length > 1 && (
              <NavigationButtons>
                <NavButton onClick={showPrevImage} aria-label="Previous image">
                  ‹
                </NavButton>
                <NavButton onClick={showNextImage} aria-label="Next image">
                  ›
                </NavButton>
              </NavigationButtons>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </CarouselContainer>
  );
}

export default ImageCarrousel;
