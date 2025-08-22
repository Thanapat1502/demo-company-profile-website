import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  locale: string;
  alternateLocales?: { [key: string]: string };
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  type?: "website" | "article" | "product" | "service";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

import { brandName } from "@/lib/static-data/company-info";

const baseUrl = "https://www.oildevelopment.com";
const defaultImage = "https://oildevelopment.com/images/seo.jpg";

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    locale,
    alternateLocales = {},
    images = [],
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config;

  // Default image if none provided
  const seoImages =
    images.length > 0
      ? images
      : [
          {
            url: defaultImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ];

  // Generate alternate languages
  const languages: { [key: string]: string } = {
    th: `${baseUrl}/th`,
    en: `${baseUrl}/en`,
    ...alternateLocales,
  };

  // Combine default keywords with page-specific ones
  const allKeywords = [
    ...keywords,
    "Gas Station Construction",
    "Petroleum Engineering",
    "Fuel Station Design",
    "Thailand Construction",
    brandName.en,
    "Oil Station Services",
    "Industrial Construction",
    "Engineering Consulting",
    "สถานีบริการน้ำมัน",
    "ก่อสร้างสถานีน้ำมัน",
    "วิศวกรรมปิโตรเลียม",
    brandName.th,
    "บริการก่อสร้าง",
    "วิศวกรรมอุตสาหกรรม",
  ];

  const metadata: Metadata = {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: author || brandName.en }],
    creator: brandName.en,
    publisher: brandName.en,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonical || `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      type: type as any,
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      url: canonical || `${baseUrl}/${locale}`,
      title,
      description,
      siteName: brandName.en,
      images: seoImages.map((img) => ({
        url: img.url,
        width: img.width || 1200,
        height: img.height || 630,
        alt: img.alt || title,
        type: "image/jpeg",
      })),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@oildevelopment",
      creator: "@oildevelopment",
      title,
      description,
      images: seoImages.map((img) => img.url),
    },
    category: section || "Business",
    classification: "Construction & Engineering Services",
  };

  return metadata;
}

// Page-specific SEO configurations
export const seoConfigs = {
  home: {
    th: {
      title: `${brandName.th} - ผู้นำด้านการพัฒนาและจำหน่ายอุปกรณ์สถานีบริการน้ำมัน`,
      description:
        "ผู้นำด้านการพัฒนาและจำหน่ายอุปกรณ์สถานีบริการน้ำมัน ด้วยประสบการณ์และความเชี่ยวชาญในงานก่อสร้างและวิศวกรรม บริการครบวงจรตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา",
      keywords: [
        "หน้าแรก",
        brandName.th,
        "สถานีบริการน้ำมัน",
        "ก่อสร้าง",
        "ถังน้ำมัน",
        "อุปกรณ์น้ำมัน",
        "ปั้มน้ำมัน",
      ],
    },
    en: {
      title: `${brandName.en} - Leading Gas Station Equipment Developer`,
      description:
        "Leading developer and supplier of gas station equipment with expertise in construction and engineering.",
      keywords: [
        "home",
        brandName.en,
        "gas station",
        "construction",
        "equipment",
        "oil",
        "gas",
      ],
    },
  },

  products: {
    th: {
      title: `ผลิตภัณฑ์และบริการ | ${brandName.th}`,
      description:
        "ผลิตภัณฑ์และบริการครบวงจรสำหรับสถานีบริการน้ำมัน รวมถึงอุปกรณ์และบริการวิศวกรรม",
      keywords: ["ผลิตภัณฑ์", "บริการ", "อุปกรณ์น้ำมัน", "วิศวกรรม"],
      section: "Products & Services",
    },
    en: {
      title: `Products & Services | ${brandName.en}`,
      description:
        "Comprehensive products and services for gas stations including equipment and engineering services",
      keywords: ["products", "services", "equipment", "engineering"],
      section: "Products & Services",
    },
  },

  contact: {
    th: {
      title: `ติดต่อเรา | ${brandName.th}`,
      description: `ติดต่อ${brandName.th} สำหรับข้อมูลเพิ่มเติมเกี่ยวกับบริการก่อสร้างสถานีบริการน้ำมัน`,
      keywords: ["ติดต่อ", "ที่อยู่", "เบอร์โทร", "อีเมล"],
      section: "Contact",
    },
    en: {
      title: `Contact Us | ${brandName.en}`,
      description: `Contact ${brandName.en} for more information about gas station construction services`,
      keywords: ["contact", "address", "phone", "email"],
      section: "Contact",
    },
  },

  company: {
    th: {
      title: `เกี่ยวกับเรา | ${brandName.th}`,
      description: `เรียนรู้เกี่ยวกับประวัติและวิสัยทัศน์ของ${brandName.th} ผู้นำด้านการพัฒนาและจำหน่ายอุปกรณ์สถานีบริการน้ำมัน`,
      keywords: ["เกี่ยวกับ", "ประวัติ", "วิสัยทัศน์", "บริษัท"],
      section: "About",
    },
    en: {
      title: `About Us | ${brandName.en}`,
      description: `Learn about the history and vision of ${brandName.en}, leader in gas station equipment development`,
      keywords: ["about", "history", "vision", "company"],
      section: "About",
    },
  },

  news: {
    th: {
      title: `ข่าวสารและกิจกรรม | ${brandName.th}`,
      description: `ติดตามข่าวสารและกิจกรรมล่าสุดจาก${brandName.th}`,
      keywords: ["ข่าวสาร", "กิจกรรม", "อัพเดท"],
      section: "News & Events",
    },
    en: {
      title: `News & Events | ${brandName.en}`,
      description: `Stay updated with the latest news and events from ${brandName.en}`,
      keywords: ["news", "events", "updates"],
      section: "News & Events",
    },
  },

  reference: {
    th: {
      title: `ผลงาน | ${brandName.th}`,
      description: `ชมผลงานการก่อสร้างสถานีบริการน้ำมันและโครงการต่างๆ ของ${brandName.th}`,
      keywords: ["ผลงาน", "โครงการ", "สถานีน้ำมัน", "ก่อสร้าง"],
      section: "References",
    },
    en: {
      title: `References | ${brandName.en}`,
      description: `View our gas station construction projects and various works by ${brandName.en}`,
      keywords: ["references", "projects", "gas station", "construction"],
      section: "References",
    },
  },
};

export function getPageSEOConfig(
  page: keyof typeof seoConfigs,
  locale: "th" | "en"
) {
  return seoConfigs[page]?.[locale] || seoConfigs.home[locale];
}
