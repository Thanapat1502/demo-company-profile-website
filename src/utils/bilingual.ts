import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";

// Type for items that have bilingual fields
export type BilingualItem =
  | ServiceType
  | ProductType
  | {
      name_th?: string;
      name_en?: string;
      description_th?: string;
      description_en?: string;
      [key: string]: any;
    };

/**
 * Utility function to get bilingual content based on current locale
 * @param item - Object with bilingual fields (name_th, name_en, description_th, description_en)
 * @param field - Field name without locale suffix ("name" or "description")
 * @param locale - Current locale ("th" or "en")
 * @returns Localized string
 */
export const getBilingualContent = (
  item: BilingualItem,
  field: "name" | "description",
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
    },
    en: {
      general: "Loading...",
      services: "Loading services...",
      products: "Loading products...",
      partners: "Loading partners...",
      content: "Loading content...",
    },
  };

  const localeTexts =
    loadingTexts[locale as keyof typeof loadingTexts] || loadingTexts.en;
  return (
    localeTexts[context as keyof typeof localeTexts] || localeTexts.general
  );
};
