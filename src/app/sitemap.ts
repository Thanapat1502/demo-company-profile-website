import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.padungsilpa.group";
  const lastModified = new Date();

  return [
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

    // PDS Group
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
}
