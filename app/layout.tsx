import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ThemeClientProvider from "@/providers/ThemeClientProvider";
import { Inter } from "next/font/google";
import * as React from "react";
import { ReduxProvider } from "./reduxProvider";
import CookiePrompt from "@/components/layout/Cookies/CookiePrompt";
import { BusinessStructuredData } from "@/components/seo/StructuredData";
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
    default: "GironaPlants - Mediterranean Plants Nursery",
    template: "%s | GironaPlants"
  },
  description: "Specialized nursery in Mediterranean plants, trees and shrubs. Quality and sustainability guaranteed from Girona, Catalonia.",
  keywords: ["plants", "nursery", "Girona", "Mediterranean", "trees", "shrubs", "gardening", "Catalonia"],
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
    title: "GironaPlants - Mediterranean Plants Nursery",
    description: "Specialized nursery in Mediterranean plants, trees and shrubs from Girona, Catalonia.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GironaPlants - Mediterranean Plants Nursery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GironaPlants - Mediterranean Plants Nursery",
    description: "Specialized nursery in Mediterranean plants, trees and shrubs from Girona, Catalonia.",
    images: ["/images/og-image.jpg"],
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
    },
  },
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html className={inter.variable} lang={params.lng}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <BusinessStructuredData locale={params.lng} />
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
