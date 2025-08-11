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

  // Only add headers for locale-specific routes
  if (locale === "th" || locale === "en") {
    // Create a new response based on the intl middleware response
    const newResponse = response
      ? new NextResponse(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        })
      : NextResponse.next();

    // Add locale-specific headers for Vercel caching
    newResponse.headers.set("X-Locale", locale);

    // Smart caching that preserves localized content
    const currentCacheControl = newResponse.headers.get("Cache-Control");

    // Only override if Next.js set private/no-cache headers
    if (
      !currentCacheControl ||
      currentCacheControl.includes("private") ||
      currentCacheControl.includes("no-cache") ||
      currentCacheControl.includes("no-store")
    ) {
      if (pathname === `/${locale}` || pathname === `/${locale}/`) {
        // Homepage - cacheable with locale awareness
        newResponse.headers.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600"
        );
        newResponse.headers.set("Cache-Tag", `locale-${locale},homepage`);
      } else if (pathname.startsWith(`/${locale}/api/`)) {
        // API routes - shorter cache
        newResponse.headers.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
        );
        newResponse.headers.set("Cache-Tag", `locale-${locale},api-data`);
      } else {
        // Other pages - cacheable with locale awareness
        newResponse.headers.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
        );
        newResponse.headers.set("Cache-Tag", `locale-${locale}`);
      }
    } else {
      // Preserve existing cache headers but add cache tags
      if (pathname === `/${locale}` || pathname === `/${locale}/`) {
        newResponse.headers.set("Cache-Tag", `locale-${locale},homepage`);
      } else if (pathname.startsWith(`/${locale}/api/`)) {
        newResponse.headers.set("Cache-Tag", `locale-${locale},api-data`);
      } else {
        newResponse.headers.set("Cache-Tag", `locale-${locale}`);
      }
    }

    // Essential headers for proper internationalization
    newResponse.headers.set("Vary", "Accept-Language");
    newResponse.headers.set("Content-Language", locale);

    // Remove problematic headers only if they exist
    if (newResponse.headers.get("Pragma") === "no-cache") {
      newResponse.headers.delete("Pragma");
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
