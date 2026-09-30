"use client";

import React from "react";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiEdit3 } from "react-icons/fi";
import {
  ArrowButton,
  Arrows,
  Author,
  Avatar,
  CardFooter,
  CardTop,
  Carousel,
  EmptyPanel,
  EmptyText,
  GoogleTag,
  Quote,
  RatingCount,
  RatingMeta,
  RatingValue,
  ReadMore,
  ReviewCard,
  ReviewDate,
  ReviewsLayout,
  StarFill,
  StarRow,
  SummaryActions,
  STAR_GAP,
  SummaryCard,
  TextLink,
  Track,
  Translated,
} from "./Reviews.style";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import type { ReviewsContent } from "@/data/reviewsContent";
import type { GoogleReviewsData } from "@/lib/googleReviews";

export type ReviewsProps = {
  copy: ReviewsContent;
  data: GoogleReviewsData | null;
  writeUrl: string;
  allUrl: string;
  locale: string;
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The multicolour Google "G" — Google's terms require attributing reviews. */
const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const Stars = ({
  rating,
  size = 16,
  label,
}: {
  rating: number;
  size?: number;
  label: string;
}) => {
  const five = Array.from({ length: 5 }, (_, i) => <FaStar key={i} />);
  // In px, so the gaps between stars don't count as filled: a 4.8 must fill
  // 80% of the fifth star, not more.
  const whole = Math.floor(rating);
  const fill = whole * (size + STAR_GAP) + (rating - whole) * size;
  return (
    <StarRow $size={size} role="img" aria-label={label}>
      {five}
      <StarFill style={{ width: `${fill}px` }}>{five}</StarFill>
    </StarRow>
  );
};

/**
 * Social proof straight from the Google Business Profile, placed just before
 * the contact panel so it answers "can I trust them?" at the moment of asking.
 * With no reviews (or no API key) it becomes a call to leave the first one.
 */
const Reviews = ({ copy, data, writeUrl, allUrl, locale }: ReviewsProps) => {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({
    start: true,
    end: false,
    overflow: false,
  });

  const updateEdges = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      // Measured, not guessed from the review count: at narrow widths even
      // two cards overflow the track.
      overflow: track.scrollWidth > track.clientWidth + 4,
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  React.useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 20) });
  };

  const intlLocale =
    locale === "en" ? "en-GB" : locale === "fr" ? "fr-FR" : "es-ES";
  const numberFormat = new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const starsLabel = (rating: number) =>
    copy.stars_label.replace("{rating}", numberFormat.format(rating));

  if (!data || !data.reviews.length) {
    return (
      <Section>
        <EmptyPanel>
          <EmptyText>
            <GoogleTag>
              <GoogleG />
              Google
            </GoogleTag>
            <h2>{copy.empty_title}</h2>
            <p>{copy.empty_text}</p>
          </EmptyText>
          <CtaLink href={writeUrl} $variant="solid" {...external}>
            <FiEdit3 aria-hidden="true" />
            {copy.write_button}
          </CtaLink>
        </EmptyPanel>
      </Section>
    );
  }

  const hasOverflow = edges.overflow;

  return (
    <Section>
      <SectionHeading
        label={copy.label}
        title={copy.title}
        action={
          hasOverflow ? (
            <Arrows>
              <ArrowButton
                type="button"
                onClick={() => scroll(-1)}
                disabled={edges.start}
                aria-label={copy.previous}
              >
                <FiArrowLeft aria-hidden="true" size={18} />
              </ArrowButton>
              <ArrowButton
                type="button"
                onClick={() => scroll(1)}
                disabled={edges.end}
                aria-label={copy.next}
              >
                <FiArrowRight aria-hidden="true" size={18} />
              </ArrowButton>
            </Arrows>
          ) : undefined
        }
      />

      <ReviewsLayout>
        <SummaryCard>
          <GoogleTag>
            <GoogleG />
            Google Maps
          </GoogleTag>
          <RatingValue>{numberFormat.format(data.rating)}</RatingValue>
          <RatingMeta>
            <Stars rating={data.rating} size={20} label={starsLabel(data.rating)} />
            <RatingCount>
              {copy.based_on.replace(
                "{count}",
                new Intl.NumberFormat(intlLocale).format(data.count)
              )}
            </RatingCount>
          </RatingMeta>
          <SummaryActions>
            <CtaLink href={writeUrl} $variant="solid" $size="md" {...external}>
              <FiEdit3 aria-hidden="true" />
              {copy.write_button}
            </CtaLink>
            <TextLink href={allUrl} {...external}>
              {copy.all_button}
            </TextLink>
          </SummaryActions>
        </SummaryCard>

        <Carousel>
          <Track
            ref={trackRef}
            onScroll={updateEdges}
            // Always focusable: the scrollbar is hidden, so arrow keys on the
            // track are the keyboard way through it.
            tabIndex={0}
            aria-label={copy.label}
          >
            {data.reviews.map((review, index) => (
              <ReviewCard key={`${review.author}-${index}`}>
                <CardTop>
                  {review.rating != null ? (
                    <Stars
                      rating={review.rating}
                      label={starsLabel(review.rating)}
                    />
                  ) : (
                    <span />
                  )}
                  <ReviewDate>{review.when}</ReviewDate>
                </CardTop>

                <Quote>{review.text}</Quote>
                {review.translated && <Translated>{copy.translated}</Translated>}

                <CardFooter>
                  <Avatar aria-hidden="true">
                    {review.authorPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={review.authorPhoto}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      review.author.charAt(0).toUpperCase()
                    )}
                  </Avatar>
                  <Author>
                    {review.authorUrl ? (
                      <a href={review.authorUrl} {...external}>
                        {review.author}
                      </a>
                    ) : (
                      <strong>{review.author}</strong>
                    )}
                  </Author>
                  {review.url ? (
                    <ReadMore href={review.url} {...external}>
                      {copy.read_more}
                    </ReadMore>
                  ) : (
                    <GoogleG size={16} />
                  )}
                </CardFooter>
              </ReviewCard>
            ))}
          </Track>
        </Carousel>
      </ReviewsLayout>
    </Section>
  );
};

export default Reviews;
