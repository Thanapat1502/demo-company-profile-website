import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "th"],

  // Used when no locale matches
  defaultLocale: "en",
});

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
