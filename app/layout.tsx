import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import ThemeClientProvider from "@/components/layout/ThemeProvider/ThemeClientProvider";
import { Inter } from "next/font/google";
import { getLanguages } from "@/lib/languages";
import "@/lib/i18n";
import * as React from "react";

interface RootLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateStaticParams() {
  const languages = getLanguages();
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const language = params.lng || "ca";

  return (
    <html lang={language} className={inter.variable}>
      <body>
        <ThemeClientProvider>
          <Navbar />
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
