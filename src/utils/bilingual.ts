import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";
import { Reference, OverseaProject } from "@/store/zustand/referenceStore";
import { News, Category } from "@/store/zustand/newsStore";
import { Contact, Company } from "@/store/zustand/contactStore";
import { ExecutiveType } from "@/store/zustand/executiveStore";

// Type for items that have bilingual fields
export type BilingualItem =
  | ServiceType
  | ProductType
  | Reference
  | OverseaProject
  | News
  | Category
  | Contact
  | Company
  | ExecutiveType
  | {
      name_th?: string;
      name_en?: string;
      description_th?: string;
      description_en?: string;
      location_th?: string;
      location_en?: string;
      type_th?: string;
      type_en?: string;
      project_name_th?: string;
      project_name_en?: string;
      country_th?: string;
      country_en?: string;
      title_th?: string;
      title_en?: string;
      excerpt_th?: string;
      excerpt_en?: string;
      cat_th?: string;
      cat_en?: string;
      address_th?: string;
      address_en?: string;
      business_hour_th?: string;
      business_hour_en?: string;
      [key: string]: any;
    };

/**
 * Utility function to get bilingual content based on current locale
 * @param item - Object with bilingual fields
 * @param field - Field name without locale suffix
 * @param locale - Current locale ("th" or "en")
 * @returns Localized string
 */
export const getBilingualContent = (
  item: BilingualItem,
  field:
    | "name"
    | "description"
    | "location"
    | "type"
    | "project_name"
    | "country"
    | "title"
    | "excerpt"
    | "cat"
    | "address"
    | "business_hour"
    | "position",
  locale: string
): string => {
  const suffix = locale === "th" ? "_th" : "_en";
  const fieldKey = `${field}${suffix}` as keyof BilingualItem;
  return (item[fieldKey] as string) || "";
};

/**
 * Get localized name from bilingual item
 */
export const getBilingualName = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "name", locale);
};

/**
 * Get localized description from bilingual item
 */
export const getBilingualDescription = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "description", locale);
};

/**
 * Get localized title from news item
 */
export const getBilingualTitle = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "title", locale);
};

/**
 * Get localized excerpt from news item
 */
export const getBilingualExcerpt = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "excerpt", locale);
};

/**
 * Get localized category name
 */
export const getBilingualCategory = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "cat", locale);
};

/**
 * Get localized address from contact/company item
 */
export const getBilingualAddress = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "address", locale);
};

/**
 * Get localized business hours from contact/company item
 */
export const getBilingualBusinessHours = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "business_hour", locale);
};

/**
 * Get localized position from executive item
 */
export const getBilingualPosition = (
  item: BilingualItem,
  locale: string
): string => {
  return getBilingualContent(item, "position", locale);
};

/**
 * Helper function to get loading text based on locale
 */
export const getLoadingText = (
  locale: string,
  context: string = "general"
): string => {
  const loadingTexts = {
    th: {
      general: "กำลังโหลด...",
      services: "กำลังโหลดบริการ...",
      products: "กำลังโหลดผลิตภัณฑ์...",
      partners: "กำลังโหลดพาร์ทเนอร์...",
      content: "กำลังโหลดข้อมูล...",
      news: "กำลังโหลดข่าวสาร...",
      categories: "กำลังโหลดหมวดหมู่...",
      contact: "กำลังโหลดข้อมูลติดต่อ...",
      companies: "กำลังโหลดข้อมูลบริษัท...",
      executives: "กำลังโหลดข้อมูลผู้บริหาร...",
    },
    en: {
      general: "Loading...",
      services: "Loading services...",
      products: "Loading products...",
      partners: "Loading partners...",
      content: "Loading content...",
      news: "Loading news...",
      categories: "Loading categories...",
      contact: "Loading contact information...",
      companies: "Loading company information...",
      executives: "Loading executive information...",
    },
  };

  const localeTexts =
    loadingTexts[locale as keyof typeof loadingTexts] || loadingTexts.en;
  return (
    localeTexts[context as keyof typeof localeTexts] || localeTexts.general
  );
};
