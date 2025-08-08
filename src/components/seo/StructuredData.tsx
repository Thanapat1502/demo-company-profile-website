import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateWebPageSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  StructuredDataConfig,
} from "@/lib/seo/structured-data";

interface StructuredDataProps {
  type?:
    | "Organization"
    | "WebSite"
    | "WebPage"
    | "Service"
    | "Article"
    | "Breadcrumb";
  locale: "th" | "en";
  config?: StructuredDataConfig;
  breadcrumbs?: Array<{ name: string; url: string }>;
  articleData?: {
    headline: string;
    articleBody?: string;
    wordCount?: number;
    tags?: string[];
  };
}

export default function StructuredData({
  type = "Organization",
  locale,
  config,
  breadcrumbs = [],
  articleData,
}: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return generateOrganizationSchema(locale);
      case "WebSite":
        return generateWebsiteSchema(locale);
      case "WebPage":
        return config ? generateWebPageSchema(config) : null;
      case "Service":
        return generateServiceSchema(locale);
      case "Article":
        return config && articleData
          ? generateArticleSchema({ ...config, ...articleData })
          : null;
      case "Breadcrumb":
        return breadcrumbs.length > 0
          ? generateBreadcrumbSchema(breadcrumbs)
          : null;
      default:
        return generateOrganizationSchema(locale);
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
