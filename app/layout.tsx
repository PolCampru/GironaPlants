import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ThemeClientProvider from "@/providers/ThemeClientProvider";
import { Inter } from "next/font/google";
import * as React from "react";
import { ReduxProvider } from "./reduxProvider";
import CookiePrompt from "@/components/layout/Cookies/CookiePrompt";

interface RootLayoutProps {
  children: ReactNode;
  params: {
    lng: string;
  };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html className={inter.variable} lang={params.lng}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeClientProvider>
          <ReduxProvider>
            <Navbar />
            <div className="layout-content">{children}</div>
            <CookiePrompt />
          </ReduxProvider>
          <Footer />
        </ThemeClientProvider>
      </body>
    </html>
  );
}
