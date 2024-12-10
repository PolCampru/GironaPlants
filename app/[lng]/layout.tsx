import { ReactNode } from "react";

const languages = ["en", "es", "ca", "fr"];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface LayoutProps {
  children: ReactNode;
  params: { lng: string };
}

export default function LocaleLayout({
  children,
  params: { lng },
}: LayoutProps) {
  return (
    <html lang={lng}>
      <body>{children}</body>
    </html>
  );
}
