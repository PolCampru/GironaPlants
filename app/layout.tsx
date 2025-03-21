import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ThemeClientProvider from "@/providers/ThemeClientProvider";
import { Inter } from "next/font/google";
import { getLanguages } from "@/lib/languages";
import * as React from "react";
import { ReduxProvider } from "./reduxProvider";

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeClientProvider>
          <ReduxProvider>
            <Navbar />
            <div className="layout-content">{children}</div>
          </ReduxProvider>
          <Footer />
        </ThemeClientProvider>
      </body>
    </html>
  );
}
