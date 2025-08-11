import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "rmzwbozxbepjfonhmgfv.supabase.co",
      },
    ],
  },
  // Optimize caching for locale-specific pages
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic pages
      static: 180, // 3 minutes for static pages
    },
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Add headers for better caching control
  async headers() {
    return [
      {
        source: "/:locale(th|en)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
          {
            key: "Vary",
            value: "Accept-Language, Accept-Encoding",
          },
          {
            key: "X-Locale",
            value: ":locale",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
