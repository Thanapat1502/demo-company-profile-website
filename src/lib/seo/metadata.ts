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

const baseUrl = "https://www.padungsilpa.group";
const defaultImage = "https://padungsilpa.group/images/seo.jpg";

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
    "PADUNGSILPA GROUP",
    "Oil Station Services",
    "Industrial Construction",
    "Engineering Consulting",
    "สถานีบริการน้ำมัน",
    "ก่อสร้างสถานีน้ำมัน",
    "วิศวกรรมปิโตรเลียม",
    "ผดุงศิลป์กรุ๊ป",
    "บริการก่อสร้าง",
    "วิศวกรรมอุตสาหกรรม",
  ];

  const metadata: Metadata = {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: author || "PADUNGSILPA GROUP" }],
    creator: "PADUNGSILPA GROUP",
    publisher: "PADUNGSILPA GROUP",
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
      siteName: "PADUNGSILPA GROUP",
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
      site: "@padungsilpagroup",
      creator: "@padungsilpagroup",
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
      title:
        "กลุ่มบริษัท ผดุงศิลป์ - ผู้เชี่ยวชาญด้าน PERMATANK® และสถานีบริการน้ำมันครบวงจร",
      description:
        "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร, PERMATANK® ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม บริการครบวงจรตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา",
      keywords: [
        "หน้าแรก",
        "บริษัทผดุงศิลป์",
        "สถานีบริการน้ำมัน",
        "ก่อสร้าง",
        "ถังน้ำมัน",
        "permatank",
        "ปั้มน้ำมัน",
      ],
    },
    en: {
      title: "PADUNGSILPA GROUP - PERMATANK® and Gas Station construction",
      description:
        "Leading comprehensive gas station business services and PERMATANK® with over 50 years of experience in construction and engineering.",
      keywords: [
        "home",
        "PADUNGSILPA GROUP",
        "gas station",
        "construction",
        "permatank",
        "oil",
        "gas",
      ],
    },
  },

  products: {
    th: {
      title: "ผลิตภัณฑ์และบริการ | กลุ่มบริษัท ผดุงศิลป์",
      description:
        "ผลิตภัณฑ์และบริการครบวงจรสำหรับสถานีบริการน้ำมัน รวมถึง PERMATANK® และบริการวิศวกรรม",
      keywords: ["ผลิตภัณฑ์", "บริการ", "PERMATANK", "วิศวกรรม"],
      section: "Products & Services",
    },
    en: {
      title: "Products & Services | PADUNGSILPA GROUP",
      description:
        "Comprehensive products and services for gas stations including PERMATANK® and engineering services",
      keywords: ["products", "services", "PERMATANK", "engineering"],
      section: "Products & Services",
    },
  },

  contact: {
    th: {
      title: "ติดต่อเรา | กลุ่มบริษัท ผดุงศิลป์",
      description:
        "ติดต่อกลุ่มบริษัท ผดุงศิลป์ สำหรับข้อมูลเพิ่มเติมเกี่ยวกับบริการก่อสร้างสถานีบริการน้ำมัน",
      keywords: ["ติดต่อ", "ที่อยู่", "เบอร์โทร", "อีเมล"],
      section: "Contact",
    },
    en: {
      title: "Contact Us | PADUNGSILPA GROUP",
      description:
        "Contact PADUNGSILPA GROUP for more information about gas station construction services",
      keywords: ["contact", "address", "phone", "email"],
      section: "Contact",
    },
  },

  company: {
    th: {
      title: "เกี่ยวกับเรา | กลุ่มบริษัท ผดุงศิลป์",
      description:
        "เรียนรู้เกี่ยวกับประวัติและวิสัยทัศน์ของกลุ่มบริษัท ผดุงศิลป์ ผู้นำด้านก่อสร้างสถานีบริการน้ำมัน",
      keywords: ["เกี่ยวกับ", "ประวัติ", "วิสัยทัศน์", "บริษัท"],
      section: "About",
    },
    en: {
      title: "About Us | PADUNGSILPA GROUP",
      description:
        "Learn about the history and vision of PADUNGSILPA GROUP, leader in gas station construction",
      keywords: ["about", "history", "vision", "company"],
      section: "About",
    },
  },

  news: {
    th: {
      title: "ข่าวสารและกิจกรรม | กลุ่มบริษัท ผดุงศิลป์",
      description: "ติดตามข่าวสารและกิจกรรมล่าสุดจากกลุ่มบริษัท ผดุงศิลป์",
      keywords: ["ข่าวสาร", "กิจกรรม", "อัพเดท"],
      section: "News & Events",
    },
    en: {
      title: "News & Events | PADUNGSILPA GROUP",
      description:
        "Stay updated with the latest news and events from PADUNGSILPA GROUP",
      keywords: ["news", "events", "updates"],
      section: "News & Events",
    },
  },

  reference: {
    th: {
      title: "ผลงาน | กลุ่มบริษัท ผดุงศิลป์",
      description:
        "ชมผลงานการก่อสร้างสถานีบริการน้ำมันและโครงการต่างๆ ของกลุ่มบริษัท ผดุงศิลป์",
      keywords: ["ผลงาน", "โครงการ", "สถานีน้ำมัน", "ก่อสร้าง"],
      section: "References",
    },
    en: {
      title: "References | PADUNGSILPA GROUP",
      description:
        "View our gas station construction projects and various works by PADUNGSILPA GROUP",
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
