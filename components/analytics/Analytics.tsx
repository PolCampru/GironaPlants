import Script from "next/script";

// Same-origin path, proxied to the Umami container by Caddy. Overridable so a
// staging box can point somewhere else.
const SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || "/stats/script.js";
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/**
 * Renders nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID is set, so local
 * development and the first production build (before the site exists in the
 * Umami panel) do not fire requests at a route that 404s.
 *
 * The id is not a secret: it is public in the page source of every Umami site.
 */
export default function Analytics() {
  if (!WEBSITE_ID) return null;

  return (
    <Script
      src={SRC}
      data-website-id={WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
