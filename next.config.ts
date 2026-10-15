import type { NextConfig } from "next";

// Hosts allowed to serve Strapi media. STRAPI_MEDIA_URL (or the NEXT_PUBLIC_
// variant) must be listed here too, otherwise next/image and the CSP reject
// the images — so derive it instead of hardcoding.
const mediaHosts = Array.from(
  new Set(
    [
      "strapi.gironaplants.com",
      "api.gironaplants.com",
      ...[
        process.env.STRAPI_MEDIA_URL,
        process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL,
      ].flatMap((url) => {
        try {
          return url ? [new URL(url).hostname] : [];
        } catch {
          return [];
        }
      }),
    ].filter(Boolean)
  )
);
const mediaOrigins = mediaHosts.map((h) => `https://${h}`).join(" ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: mediaHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options", 
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === 'production' 
              ? `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: ${mediaOrigins}; connect-src 'self' ${mediaOrigins}; frame-ancestors 'none';`
              : "default-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: https: http: blob:; connect-src 'self' https: http: ws: wss:; frame-ancestors 'none';",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === 'production' 
              ? "https://gironaplants.com"
              : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
