import { NextRequest, NextResponse } from "next/server";
import { getLanguages } from "@/lib/languages";

const locales = getLanguages();
const defaultLocale = "ca";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  console.log("middleware ejecutándose");
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.includes("/api/")) {
    return;
  }

  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (hasLocale) {
    return;
  }

  const acceptLanguage = request.headers.get("Accept-Language") || "";

  let userLang = acceptLanguage.split(",")[0]?.split("-")[0];

  if (!locales.includes(userLang)) {
    userLang = defaultLocale;
  }

  return NextResponse.redirect(new URL(`/${userLang}${pathname}`, request.url));
}

// Configurar el matcher para que el middleware se ejecute solo en las rutas específicas
export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
