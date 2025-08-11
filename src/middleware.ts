import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "th"],

  // Used when no locale matches
  defaultLocale: "th",
});

export default function middleware(request: NextRequest) {
  // Get the response from next-intl middleware
  const response = intlMiddleware(request);

  // Extract locale from the pathname
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  // Add locale-specific cache headers
  if (locale === "th" || locale === "en") {
    // Clone the response to modify headers
    const newResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Copy all headers from the intl middleware response
    if (response) {
      response.headers.forEach((value, key) => {
        newResponse.headers.set(key, value);
      });
    }

    // Add locale-specific cache tags
    newResponse.headers.set("Cache-Tag", `locale-${locale}`);
    newResponse.headers.set("X-Locale", locale);
    newResponse.headers.set("Vary", "Accept-Language, Accept-Encoding");

    // Add specific cache control for different page types
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      // Homepage gets special cache treatment
      newResponse.headers.set(
        "Cache-Control",
        "public, s-maxage=1800, stale-while-revalidate=3600"
      );
      newResponse.headers.set("Cache-Tag", `locale-${locale},homepage`);
    } else {
      // Other pages
      newResponse.headers.set(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400"
      );
    }

    return newResponse;
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames, exclude admin routes
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - admin routes
    // - all files inside /public (e.g. /favicon.ico)
    // - files with extensions
    "/((?!api|_next|_static|admin|.*\\..*).*)",
  ],
};
