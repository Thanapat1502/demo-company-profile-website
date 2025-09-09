export interface StructuredDataConfig {
  locale: "th" | "en";
  page?: string;
  title?: string;
  description?: string;
  images?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

import { brandName, logo } from "@/lib/static-data/company-info";

const baseUrl = "https://www.oildevelopment.com";

export function generateOrganizationSchema(locale: "th" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: locale === "th" ? brandName.th : brandName.en,
    alternateName: ["OIL DEVELOPMENT", "Oil Development"],
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}${logo.main}`,
      width: 200,
      height: 60,
    },
    image: {
      "@type": "ImageObject",
      url: "https://oildevelopment.com/images/seo.jpg",
      width: 1200,
      height: 630,
    },
    description:
      locale === "th"
        ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม"
        : "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering",
    foundingDate: "2003",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11/1 Chaengwatta 14 Rd, Thungsonghong",
      addressLocality: "Laksi",
      addressRegion: "Bangkok",
      postalCode: "10210",
      addressCountry: "TH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+66-2-XXX-XXXX",
        contactType: "customer service",
        availableLanguage: ["Thai", "English"],
        areaServed: "TH",
      },
      {
        "@type": "ContactPoint",
        email: "info@OIL DEVELOPMENT.group",
        contactType: "customer service",
        availableLanguage: ["Thai", "English"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/OIL DEVELOPMENTgroup",
      "https://www.linkedin.com/company/OIL DEVELOPMENT-group",
    ],
    industry: "Construction and Engineering",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "100-500",
    },
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    knowsAbout: [
      "Gas Station Construction",
      "Petroleum Engineering",
      "Industrial Construction",
      "Engineering Consulting",
      "PERMATANK Systems",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "th"
          ? "บริการก่อสร้างและวิศวกรรม"
          : "Construction and Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              locale === "th"
                ? "ก่อสร้างสถานีบริการน้ำมัน"
                : "Gas Station Construction",
            description:
              locale === "th"
                ? "บริการก่อสร้างสถานีบริการน้ำมันครบวงจร"
                : "Comprehensive gas station construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "PERMATANK®",
            description:
              locale === "th"
                ? "ระบบถังเก็บน้ำมันใต้ดินคุณภาพสูง"
                : "High-quality underground fuel storage tank systems",
          },
        },
      ],
    },
  };
}

export function generateWebsiteSchema(locale: "th" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: locale === "th" ? "กลุ่มบริษัท OIL DEVELOPMENT" : "OIL DEVELOPMENT",
    url: baseUrl,
    description:
      locale === "th"
        ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี"
        : "Leading comprehensive gas station business services with over 50 years of experience",
    inLanguage: ["th", "en"],
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateWebPageSchema(config: StructuredDataConfig) {
  const {
    locale,
    page,
    title,
    description,
    images = [],
    publishedTime,
    modifiedTime,
    author,
    breadcrumbs = [],
  } = config;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/${locale}${page ? `/${page}` : ""}/#webpage`,
    url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
    name: title,
    description: description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    about: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  if (publishedTime) {
    schema.datePublished = publishedTime;
  }

  if (modifiedTime) {
    schema.dateModified = modifiedTime;
  }

  if (author) {
    schema.author = {
      "@type": "Person",
      name: author,
    };
  }

  if (images.length > 0) {
    schema.primaryImageOfPage = {
      "@type": "ImageObject",
      url: images[0],
      width: 1200,
      height: 630,
    };
  }

  if (breadcrumbs.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  return schema;
}

export function generateServiceSchema(locale: "th" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/services/#service`,
    name:
      locale === "th"
        ? "บริการก่อสร้างสถานีบริการน้ำมัน"
        : "Gas Station Construction Services",
    description:
      locale === "th"
        ? "บริการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันครบวงจร ตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา"
        : "Comprehensive gas station construction and engineering services from design to maintenance",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    serviceType: "Construction and Engineering",
    category: "Gas Station Construction",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "th" ? "บริการก่อสร้าง" : "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "th" ? "ออกแบบสถานีบริการ" : "Gas Station Design",
            description:
              locale === "th"
                ? "บริการออกแบบสถานีบริการน้ำมัน"
                : "Gas station design services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              locale === "th"
                ? "ก่อสร้างสถานีบริการ"
                : "Gas Station Construction",
            description:
              locale === "th"
                ? "บริการก่อสร้างสถานีบริการน้ำมัน"
                : "Gas station construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "th" ? "บำรุงรักษา" : "Maintenance Services",
            description:
              locale === "th"
                ? "บริการบำรุงรักษาสถานีบริการน้ำมัน"
                : "Gas station maintenance services",
          },
        },
      ],
    },
  };
}

export function generateArticleSchema(
  config: StructuredDataConfig & {
    headline: string;
    articleBody?: string;
    wordCount?: number;
    tags?: string[];
  }
) {
  const {
    locale,
    title,
    description,
    images = [],
    publishedTime,
    modifiedTime,
    author,
    headline,
    articleBody,
    wordCount,
    tags = [],
  } = config;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: images,
    author: {
      "@type": "Person",
      name: author || "OIL DEVELOPMENT",
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/news-events/${title
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`,
    },
    articleBody: articleBody,
    wordCount: wordCount,
    keywords: tags.join(", "),
    inLanguage: locale,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
