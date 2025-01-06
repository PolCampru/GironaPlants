import React, { useRef, useState, useEffect } from "react";
import {
  CarouselInner,
  ContainerCards,
  ContainerHeader,
  ContainerOffers,
} from "./ContainerOffers.style";
import OffertCardMini from "../OffertCardMini/OffertCardMini";
import { OfferType } from "@/types/Offers";

interface OffersCarouselProps {
  query: { offers: boolean };
  data: { filters: { offersTitle: string } };
  offersData: OfferType[];
  handleAddToCart: (product: OfferType) => void;
}

export function OffersCarousel({
  query,
  data,
  offersData,
  handleAddToCart,
}: OffersCarouselProps) {
  const [leftValue, setLeftValue] = useState(0);

  const carouselInnerRef = useRef<HTMLDivElement | null>(null);
  const containerCardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselInnerRef.current || !containerCardsRef.current) return;

    const onResize = () => {};
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    const maxLeft = -(innerWidth - viewportWidth);

    const newLeft = leftValue - getMovementSize();
    if (newLeft >= maxLeft) {
      setLeftValue(newLeft);
    }
  };

  return (
    <ContainerOffers $open={query.offers}>
      <ContainerHeader>
        <p>{data.filters.offersTitle}</p>

        <div className="container-arrow" onClick={handlePrev}>
          <img
            src="/images/products/arrowIcon.svg"
            alt="arrow"
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(180deg)",
            }}
          />
        </div>

        <div className="container-arrow" onClick={handleNext}>
          <img
            src="/images/products/arrowIcon.svg"
            alt="arrow"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
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
