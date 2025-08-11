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

    // Let Vercel handle Cache-Control via vercel.json
    // Only add cache tags for cache invalidation
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      newResponse.headers.set("Cache-Tag", `locale-${locale},homepage`);
    } else if (pathname.startsWith(`/${locale}/api/`)) {
      newResponse.headers.set("Cache-Tag", `locale-${locale},api-data`);
    } else {
      newResponse.headers.set("Cache-Tag", `locale-${locale}`);
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
