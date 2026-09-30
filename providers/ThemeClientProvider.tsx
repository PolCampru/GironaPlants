"use client";

import "@/lib/i18n";
import { ReactNode, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import theme from "@/lib/theme";

interface ThemeClientProviderProps {
  children: ReactNode;
}

/**
 * Collects the styled-components CSS during the server render and flushes it
 * into the HTML. Without it the server shipped every page with no component
 * styles at all: the page painted unstyled until JavaScript injected them, and
 * anything with a CSS transition (every CtaLink) then animated in from
 * transparent — and stayed transparent wherever rAF was paused.
 */
function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}

export default function ThemeClientProvider({
  children,
}: ThemeClientProviderProps) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
