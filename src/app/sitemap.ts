import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.padungsilpa.group";
  const lastModified = new Date();

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Root pages
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/th`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Products & Services
    {
      url: `${baseUrl}/th/products-services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/products-services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Contact Us
    {
      url: `${baseUrl}/th/contact-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // PDS Group pages
    {
      url: `${baseUrl}/th/pds-group`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/pds-group`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/th/pds-group/history`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/pds-group/history`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/th/pds-group/executive-team`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/pds-group/executive-team`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/th/pds-group/mission-commitment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/pds-group/mission-commitment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // News & Events
    {
      url: `${baseUrl}/th/news-events`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/news-events`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Reference
    {
      url: `${baseUrl}/th/reference`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/reference`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    // Fetch dynamic content from database
    const [newsResult, referencesResult] = await Promise.all([
      supabase
        .from("news")
        .select("slug, updated_at, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
      supabase
        .from("references")
        .select("id, updated_at, created_at")
        .order("created_at", { ascending: false }),
    ]);

    // Add news articles to sitemap
    const newsPages: MetadataRoute.Sitemap = [];
    if (newsResult.data) {
      for (const article of newsResult.data) {
        const articleLastModified = new Date(
          article.updated_at || article.created_at
        );
        newsPages.push(
          {
            url: `${baseUrl}/th/news-events/${article.slug}`,
            lastModified: articleLastModified,
            changeFrequency: "monthly",
            priority: 0.6,
          },
          {
            url: `${baseUrl}/en/news-events/${article.slug}`,
            lastModified: articleLastModified,
            changeFrequency: "monthly",
            priority: 0.6,
          }
        );
      }
    }

    // Add reference projects to sitemap
    const referencePages: MetadataRoute.Sitemap = [];
    if (referencesResult.data) {
      for (const reference of referencesResult.data) {
        const refLastModified = new Date(
          reference.updated_at || reference.created_at
        );
        referencePages.push(
          {
            url: `${baseUrl}/th/reference/${reference.id}`,
            lastModified: refLastModified,
            changeFrequency: "monthly",
            priority: 0.5,
          },
          {
            url: `${baseUrl}/en/reference/${reference.id}`,
            lastModified: refLastModified,
            changeFrequency: "monthly",
            priority: 0.5,
          }
        );
      }
    }

    return [...staticPages, ...newsPages, ...referencePages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages if database fetch fails
    return staticPages;
  }
}
