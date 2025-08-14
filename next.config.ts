import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  distDir: isDev ? ".next-dev" : ".next",
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
  // Optimize caching for locale-specific pages with ISR
  experimental: {
    staleTimes: {
      dynamic: 30, // Allow some dynamic caching for locale context
      static: 3600, // 1 hour for static pages
    },
  },
  // Enable standalone output for better performance
  output: "standalone",
  // Force proper static generation for locale routes
  trailingSlash: false,
  // Generate static pages for all locales
  generateBuildId: async () => {
    // Use a consistent build ID for better caching
    return `build-${Date.now()}`;
  },
  // Ensure proper route matching
  async rewrites() {
    return [];
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
