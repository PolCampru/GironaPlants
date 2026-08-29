import React, { useRef, useState, useEffect } from "react";
import {
  CarouselInner,
  ContainerArrow,
  ContainerCards,
  ContainerHeader,
  ContainerOffers,
} from "./ContainerOffers.style";
import OffertCardMini from "../OffertCardMini/OffertCardMini";
import { OfferType } from "@/types/Offers";
import { QuoteItemSource } from "@/types/Cart";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useUiLabels from "@/hooks/useUiLabels";

interface OffersCarouselProps {
  query: { offers: boolean };
  data: { filters: { offersTitle: string } };
  offersData: OfferType[];
  handleAddToCart: (product: OfferType, source?: QuoteItemSource) => void;
}

export function OffersCarousel({
  query,
  data,
  offersData,
  handleAddToCart,
}: OffersCarouselProps) {
  const labels = useUiLabels();
  const [leftValue, setLeftValue] = useState(0);
  const [maxLeft, setMaxLeft] = useState(0);

  const carouselInnerRef = useRef<HTMLDivElement | null>(null);
  const containerCardsRef = useRef<HTMLDivElement | null>(null);

  const calculateMaxLeft = () => {
    if (!carouselInnerRef.current || !containerCardsRef.current) {
      setMaxLeft(0);
      return;
    }

    const innerWidth = carouselInnerRef.current.scrollWidth + 272;
    const viewportWidth = containerCardsRef.current.clientWidth;
    const movementSize = getMovementSize();

    const totalMovements = Math.ceil(
      (innerWidth - viewportWidth) / movementSize
    );

    setMaxLeft(-movementSize * (totalMovements - 1));
  };

  useEffect(() => {
    if (!carouselInnerRef.current || !containerCardsRef.current) return;
    calculateMaxLeft();

    const onResize = () => {
      calculateMaxLeft();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offersData]);

  const getMovementSize = (): number => {
    if (!carouselInnerRef.current?.firstElementChild) return 272;
    const firstCard = carouselInnerRef.current.firstElementChild as HTMLElement;
    const cardWidth = parseFloat(window.getComputedStyle(firstCard).width);
    const gap = 10;
    return cardWidth + gap;
  };

  const handlePrev = () => {
    if (leftValue < 0) {
      setLeftValue((prev) => prev + getMovementSize());
    }
  };

  const handleNext = () => {
    if (!carouselInnerRef.current || !containerCardsRef.current) return;

    const innerWidth = carouselInnerRef.current.scrollWidth;
    const viewportWidth = containerCardsRef.current.clientWidth;
    const maxLeft = -(innerWidth - viewportWidth + 272);

    const newLeft = leftValue - getMovementSize();
    if (newLeft >= maxLeft) {
      setLeftValue(newLeft);
    }
  };

  return (
    <ContainerOffers $open={query.offers}>
      <ContainerHeader>
        <p>{data.filters.offersTitle}</p>

        <ContainerArrow
          as="button"
          type="button"
          onClick={handlePrev}
          $isActive={leftValue < 0}
          aria-label={labels.previous}
        >
          <FiChevronLeft aria-hidden="true" size={18} />
        </ContainerArrow>

        <ContainerArrow
          as="button"
          type="button"
          onClick={handleNext}
          $isActive={leftValue > maxLeft}
          aria-label={labels.next}
        >
          <FiChevronRight aria-hidden="true" size={18} />
        </ContainerArrow>
      </ContainerHeader>

      <ContainerCards ref={containerCardsRef}>
        <CarouselInner
          ref={carouselInnerRef}
          style={{ left: `${leftValue}px` }}
        >
          {offersData.map((offer) => (
            <OffertCardMini
              key={offer.id}
              offer={offer}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </CarouselInner>
      </ContainerCards>
    </ContainerOffers>
  );
}
