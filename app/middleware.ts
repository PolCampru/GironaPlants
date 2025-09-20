import { NextRequest, NextResponse } from "next/server";
import { getLanguages } from "@/lib/languages";

const locales = getLanguages();
const defaultLocale = "ca";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log("🔍 Middleware ejecutándose:", { pathname, url: request.url });

  // Skip middleware for static files and API routes
  if (PUBLIC_FILE.test(pathname) || pathname.includes("/api/")) {
    console.log("⏭️ Saltando archivo estático o API:", pathname);
    return;
  }

  // If already has a locale, continue
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) {
    console.log("✅ Ya tiene locale:", pathname);
    return;
  }

  // Get user's preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language") || "";
  console.log("🌍 Accept-Language header:", acceptLanguage);
  
  // Parse preferred languages with quality values
  const preferredLanguages = acceptLanguage
    .split(",")
    .map(lang => lang.split("-")[0].trim())
    .filter(lang => lang);
  console.log("📋 Idiomas preferidos:", preferredLanguages);

  // Find the first supported language or use default
  let userLang = defaultLocale;
  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      userLang = lang;
      break;
    }
  }
  
  console.log("🎯 Idioma seleccionado:", userLang);
  console.log("🔄 Redirigiendo a:", `/${userLang}${pathname}`);

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
