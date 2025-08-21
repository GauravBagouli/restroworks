import { NextResponse, NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/i18n/config";

const PUBLIC_FILES = [
  "/favicon.ico", "/robots.txt", "/sitemap.xml", "/manifest.json",
];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILES.some((p) => pathname === p || pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (segments.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  if (!isLocale(maybeLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\.[\\w]+$).*)",
  ],
};
