/**
 * Umami events.
 *
 * The tracker is served first-party from /stats/script.js (see
 * deploy/Caddyfile), so it is not filtered by the blocklists that drop known
 * analytics hostnames, and `script-src 'self'` in next.config.ts already
 * allows it — no CSP exception needed.
 *
 * It is cookieless and stores no personal data, so nothing here waits on the
 * cookie banner. Never send anything a visitor typed: event data is for
 * counting, and the enquiry itself is recorded in Strapi instead
 * (lib/quoteRequests.ts).
 */

export type AnalyticsEvent =
  | "quote_started"
  | "quote_item_added"
  | "quote_submitted"
  | "contact_submitted"
  | "catalogue_download"
  | "language_switch";

export type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/**
 * Best effort by design: on a dev machine, or when the script failed to load,
 * `window.umami` is undefined and this is a no-op. Analytics must never be
 * able to break a quote.
 */
export function track(event: AnalyticsEvent, data?: EventData): void {
  if (typeof window === "undefined") return;

  try {
    window.umami?.track(event, data);
  } catch {
    // Swallowed on purpose.
  }
}
