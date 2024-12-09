// app/[lng]/layout.tsx
import { ReactNode } from "react";
import i18n from "@/lib/i18n";

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
  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }
  return <div lang={lng}>{children}</div>;
}
