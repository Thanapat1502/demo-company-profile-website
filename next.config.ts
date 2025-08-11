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
      {
        protocol: "https",
        hostname: "rmzwbozxbepjfonhmgfv.supabase.co",
        pathname: "/storage/v1/object/public/website-assets/**",
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
  // Remove headers function to let Vercel handle caching
  // Headers are now managed in vercel.json for better control
};

export default withNextIntl(nextConfig);
