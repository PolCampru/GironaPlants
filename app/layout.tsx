import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ThemeClientProvider from "@/providers/ThemeClientProvider";
import { Inter } from "next/font/google";
import * as React from "react";
import { ReduxProvider } from "./reduxProvider";
import CookiePrompt from "@/components/layout/Cookies/CookiePrompt";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

interface RootLayoutProps {
  children: ReactNode;
  params: {
    lng: string;
  };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://gironaplants.com"),
  title: {
    default: "GironaPlants - Plant sourcing across Europe",
    template: "%s | GironaPlants"
  },
  description: "More than 30 years sourcing plants for professionals. We grow Mediterranean plants at our nursery in Girona and source any other species through our grower network across Europe.",
  keywords: ["plant sourcing Europe", "wholesale plants Europe", "plant supplier", "plants", "nursery", "Girona", "Mediterranean", "trees", "shrubs", "gardening", "Catalonia", "landscaping"],
  authors: [{ name: "GironaPlants" }],
  creator: "GironaPlants",
  publisher: "GironaPlants",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: "https://gironaplants.com",
    siteName: "GironaPlants",
    title: "GironaPlants - Plant sourcing across Europe",
    description: "More than 30 years sourcing plants for professionals. Own production in Girona plus a grower network across Europe.",
    images: [
      {
        url: "/images/lavenders.jpg",
        width: 1280,
        height: 853,
        alt: "GironaPlants - Plant sourcing across Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GironaPlants - Plant sourcing across Europe",
    description: "More than 30 years sourcing plants for professionals. Own production in Girona plus a grower network across Europe.",
    images: ["/images/lavenders.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      es: "/es",
      ca: "/ca",
      en: "/en",
      fr: "/fr",
      "x-default": "/es",
    },
  },
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    // This layout sits above the [lng] segment, so the locale param never
    // reaches it — default the document language to the primary locale.
    // (robots and viewport come from the metadata API; the localized JSON-LD
    // lives in app/[lng]/layout.tsx.)
    <html className={inter.variable} lang={params?.lng ?? "es"}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeClientProvider>
          <ReduxProvider>
            <header>
              <Navbar />
            </header>
            <ErrorBoundary>
              <main className="layout-content">{children}</main>
            </ErrorBoundary>
            <CookiePrompt />
          </ReduxProvider>
          <Footer />
        </ThemeClientProvider>
      </body>
    </html>
  );
}
