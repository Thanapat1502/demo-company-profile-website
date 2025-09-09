import { Metadata } from "next";
import { supabase } from "@/lib/supabase";

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  author?: string;
  structured_data?: any;
}

/**
 * Fetch SEO data for a specific page and locale
 */
export async function getSEOData(
  pagePath: string,
  locale: string
): Promise<SEOData | null> {
  try {
    const { data, error } = await supabase
      .from("seo_pages")
      .select("*")
      .eq("page_path", pagePath)
      .eq("locale", locale)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      console.warn(`No SEO data found for ${pagePath} (${locale})`);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
}

/**
 * Generate Next.js Metadata object from SEO data
 */
export function generateMetadata(
  seoData: SEOData | null,
  fallback: {
    title: string;
    description: string;
    locale: string;
    pagePath: string;
  }
): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://padungsilpa.group";
  const currentUrl = `${baseUrl}/${fallback.locale}${
    fallback.pagePath === "/" ? "" : fallback.pagePath
  }`;

  return {
    title: seoData?.title || fallback.title,
    description: seoData?.description || fallback.description,
    keywords: seoData?.keywords,
    authors: seoData?.author ? [{ name: seoData.author }] : undefined,
    robots: seoData?.robots || "index,follow",

    // Open Graph
    openGraph: {
      title: seoData?.og_title || seoData?.title || fallback.title,
      description:
        seoData?.og_description || seoData?.description || fallback.description,
      url: currentUrl,
      siteName:
        fallback.locale === "th"
          ? "กลุ่มบริษัท OIL DEVELOPMENT ฯ"
          : "OIL DEVELOPMENT",
      images: seoData?.og_image
        ? [
            {
              url: seoData.og_image,
              width: 1200,
              height: 630,
              alt: seoData?.og_title || seoData?.title || fallback.title,
            },
          ]
        : [
            {
              url: `${baseUrl}/images/og-default.jpg`,
              width: 1200,
              height: 630,
              alt: fallback.title,
            },
          ],
      locale: fallback.locale === "th" ? "th_TH" : "en_US",
      type: (seoData?.og_type as any) || "website",
    },

    // Twitter
    twitter: {
      card: (seoData?.twitter_card as any) || "summary_large_image",
      title: seoData?.twitter_title || seoData?.title || fallback.title,
      description:
        seoData?.twitter_description ||
        seoData?.description ||
        fallback.description,
      images: seoData?.twitter_image
        ? [seoData.twitter_image]
        : [`${baseUrl}/images/og-default.jpg`],
    },

    // Canonical URL
    alternates: {
      canonical: seoData?.canonical_url || currentUrl,
      languages: {
        th: `${baseUrl}/th${
          fallback.pagePath === "/" ? "" : fallback.pagePath
        }`,
        en: `${baseUrl}/en${
          fallback.pagePath === "/" ? "" : fallback.pagePath
        }`,
      },
    },

    // Additional metadata
    other: {
      "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
    },
  };
}

/**
 * Generate structured data script tag
 */
export function generateStructuredData(
  seoData: SEOData | null,
  fallback: {
    title: string;
    description: string;
    locale: string;
    pagePath: string;
  }
): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://padungsilpa.group";
  const currentUrl = `${baseUrl}/${fallback.locale}${
    fallback.pagePath === "/" ? "" : fallback.pagePath
  }`;

  // Use custom structured data if available, otherwise generate default
  let structuredData = seoData?.structured_data;

  if (!structuredData) {
    // Generate default structured data based on page type
    if (fallback.pagePath === "/") {
      // Homepage - Organization schema
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name:
          fallback.locale === "th"
            ? "กลุ่มบริษัท OIL DEVELOPMENT ฯ"
            : "OIL DEVELOPMENT",
        description: seoData?.description || fallback.description,
        url: currentUrl,
        logo: `${baseUrl}/images/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+66-2-xxx-xxxx",
          contactType: "customer service",
          availableLanguage: ["Thai", "English"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "TH",
          addressLocality: "Bangkok",
        },
        sameAs: [
          "https://www.facebook.com/padungsilpa",
          "https://www.linkedin.com/company/padungsilpa",
        ],
      };
    } else {
      // Other pages - WebPage schema
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: seoData?.title || fallback.title,
        description: seoData?.description || fallback.description,
        url: currentUrl,
        isPartOf: {
          "@type": "WebSite",
          name:
            fallback.locale === "th"
              ? "กลุ่มบริษัท OIL DEVELOPMENT ฯ"
              : "OIL DEVELOPMENT",
          url: baseUrl,
        },
      };
    }
  }

  return JSON.stringify(structuredData);
}

/**
 * Generate sitemap data for all SEO pages
 */
export async function getSitemapData(): Promise<
  Array<{
    url: string;
    lastModified: Date;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }>
> {
  try {
    const { data, error } = await supabase
      .from("seo_pages")
      .select("page_path, locale, updated_at, priority, change_frequency")
      .eq("is_active", true);

    if (error || !data) {
      console.error("Error fetching sitemap data:", error);
      return [];
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://padungsilpa.group";

    return data.map((page) => ({
      url: `${baseUrl}/${page.locale}${
        page.page_path === "/" ? "" : page.page_path
      }`,
      lastModified: page.updated_at
        ? new Date(page.updated_at as string)
        : new Date(),
      changeFrequency:
        (page.change_frequency as
          | "always"
          | "never"
          | "hourly"
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly") || "weekly",
      priority: typeof page.priority === "number" ? page.priority : 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap data:", error);
    return [];
  }
}

/**
 * Default SEO fallbacks for different page types
 */
export const SEO_DEFAULTS = {
  th: {
    site_name: "กลุ่มบริษัท OIL DEVELOPMENT ฯ",
    default_title:
      "กลุ่มบริษัท OIL DEVELOPMENT ฯ - ผู้นำด้านการก่อสร้างและวิศวกรรม",
    default_description:
      "กลุ่มบริษัท OIL DEVELOPMENT ฯ ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร มีประสบการณ์กว่า 30 ปี",
    author: "กลุ่มบริษัท OIL DEVELOPMENT ฯ",
  },
  en: {
    site_name: "OIL DEVELOPMENT",
    default_title:
      "OIL DEVELOPMENT - Leading Construction and Engineering Company",
    default_description:
      "OIL DEVELOPMENT is a leading construction and engineering company with over 30 years of experience in comprehensive services",
    author: "OIL DEVELOPMENT",
  },
} as const;
