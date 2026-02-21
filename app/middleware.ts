import { NextRequest, NextResponse } from "next/server";
import { getLanguages } from "@/lib/languages";

const locales = getLanguages();
const defaultLocale = "ca";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (PUBLIC_FILE.test(pathname) || pathname.includes("/api/")) {
    return;
  }

  // If already has a locale, continue
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) {
    return;
  }

  // Get user's preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language") || "";
  
  // Parse preferred languages with quality values
  const preferredLanguages = acceptLanguage
    .split(",")
    .map(lang => lang.split("-")[0].trim())
    .filter(lang => lang);

  // Find the first supported language or use default
  let userLang = defaultLocale;
  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      userLang = lang;
      break;
    }
  }

  // Redirect to the appropriate language path
  return NextResponse.redirect(new URL(`/${userLang}${pathname}`, request.url));
}

// Configurar el matcher para que el middleware se ejecute solo en las rutas específicas
export const config = {
  matcher: [
    // Incluir la ruta raíz y todas las rutas que necesiten detección de idioma
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|images|locales|robots.txt|sitemap.xml).*)',
  ],
};
