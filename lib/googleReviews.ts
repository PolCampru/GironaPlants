// Google reviews for the home page, read from the Google Business Profile
// through the Places API (New). Server-only: the API key never reaches the
// browser.
//
// Without GOOGLE_PLACES_API_KEY this returns null and the section renders its
// "leave us a review" state instead, so the site is complete either way.

/** The Business Profile — the same place StructuredData links to. */
export const GOOGLE_PLACE_ID = "ChIJQTfeMwAvuxIR2HAUUrk8-DM";

export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
export const GOOGLE_ALL_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  /** Missing on the rare review Google returns without a score. */
  rating?: number;
  text: string;
  /** Google's own relative date ("hace 2 meses"), already localised. */
  when: string;
  /** Google shows this review machine-translated into the page locale. */
  translated: boolean;
  url?: string;
};

export type GoogleReviewsData = {
  rating: number;
  count: number;
  reviews: GoogleReview[];
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

export async function getGoogleReviews(
  locale: string
): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=${locale}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Twice a day per locale is plenty and stays inside the free tier.
        // Google's terms cap caching of Places content at 30 days.
        next: { revalidate: 43200 },
        // This sits in the home page's Promise.all: a slow Google must never
        // hold the whole page. Timing out falls back to the CTA panel.
        signal: AbortSignal.timeout(3000),
      }
    );
    if (!response.ok) return null;
    const json: PlacesResponse = await response.json();
    if (!json.rating || !json.userRatingCount) return null;

    const reviews = (json.reviews ?? [])
      // Star-only reviews make an empty card; they still count in the total.
      .filter((review) => review.text?.text?.trim())
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Google",
        authorUrl: review.authorAttribution?.uri,
        authorPhoto: review.authorAttribution?.photoUri,
        rating: review.rating,
        text: review.text!.text!.trim(),
        when: review.relativePublishTimeDescription ?? "",
        translated:
          !!review.originalText?.languageCode &&
          review.originalText.languageCode !== review.text?.languageCode,
        url: review.googleMapsUri,
      }));

    return { rating: json.rating, count: json.userRatingCount, reviews };
  } catch {
    return null;
  }
}
