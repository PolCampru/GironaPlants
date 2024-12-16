"use client";

import "@/lib/i18n";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/lib/theme";

interface ThemeClientProviderProps {
  children: ReactNode;
}

export default function ThemeClientProvider({
  children,
}: ThemeClientProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
