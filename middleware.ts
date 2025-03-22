import { NextRequest, NextResponse } from "next/server";
import { getLanguages } from "./lib/languages";

const locales = getLanguages();
const defaultLocale = "ca";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);

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
