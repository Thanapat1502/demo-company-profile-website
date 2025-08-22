/**
 * Static data fetchers for demo purposes
 * These functions replace the Zustand store API calls with static data
 */

import {
  staticServices,
  staticProducts,
  staticPartners,
  staticContent,
  staticNews,
  staticNewsCategories,
  staticNewsTags,
  staticReferences,
  staticOverseaProjects,
  staticExecutiveMembers,
} from "./index";

import { staticContactInfo, staticCompanies } from "./contact";

import type {
  ServiceType,
  ProductType,
  PartnerType,
  Content,
  News,
  NewsTag,
  Category,
  Reference,
  OverseaProject,
  ExecutiveType,
} from "./index";

import type { Contact, Company } from "@/store/zustand/contactStore";

/**
 * Fetch services (static data)
 */
export async function fetchStaticServices(): Promise<ServiceType[]> {
  console.log("Fetching services from static data");
  return staticServices;
}

/**
 * Fetch products (static data)
 */
export async function fetchStaticProducts(): Promise<ProductType[]> {
  console.log("Fetching products from static data");
  return staticProducts;
}

/**
 * Fetch partners (static data)
 */
export async function fetchStaticPartners(): Promise<PartnerType[]> {
  console.log("Fetching partners from static data");
  return staticPartners;
}

/**
 * Fetch content by page (static data)
 */
export async function fetchStaticContent(
  page: string
): Promise<Content | null> {
  console.log(`Fetching content for page ${page} from static data`);
  return staticContent[page] || null;
}

/**
 * Fetch content by ID (static data)
 */
export async function fetchStaticContentById(
  id: string
): Promise<Content | null> {
  console.log(`Fetching content by ID ${id} from static data`);
  // Find content by ID across all pages
  const allContent = Object.values(staticContent);
  return allContent.find((content) => content.id === id) || null;
}

/**
 * Fetch news (static data)
 */
export async function fetchStaticNews(): Promise<News[]> {
  console.log("Fetching news from static data");
  return staticNews;
}

/**
 * Fetch news by slug (static data)
 */
export async function fetchStaticNewsBySlug(
  slug: string,
  locale: "th" | "en"
): Promise<News | null> {
  console.log(
    `Fetching news by slug ${slug} for locale ${locale} from static data`
  );
  const slugField = locale === "th" ? "slug_th" : "slug_en";
  return staticNews.find((news) => news[slugField] === slug) || null;
}

/**
 * Fetch news categories (static data)
 */
export async function fetchStaticNewsCategories(): Promise<Category[]> {
  console.log("Fetching news categories from static data");
  return staticNewsCategories;
}

/**
 * Fetch news tags (static data)
 */
export async function fetchStaticNewsTags(): Promise<NewsTag[]> {
  console.log("Fetching news tags from static data");
  return staticNewsTags;
}

/**
 * Fetch references (static data)
 */
export async function fetchStaticReferences(): Promise<Reference[]> {
  console.log("Fetching references from static data");
  return staticReferences;
}

/**
 * Fetch reference by ID (static data)
 */
export async function fetchStaticReferenceById(
  id: string
): Promise<Reference | null> {
  console.log(`Fetching reference by ID ${id} from static data`);
  return staticReferences.find((ref) => ref.id === id) || null;
}

/**
 * Fetch oversea projects (static data)
 */
export async function fetchStaticOverseaProjects(): Promise<OverseaProject[]> {
  console.log("Fetching oversea projects from static data");
  return staticOverseaProjects;
}

/**
 * Fetch executive members (static data)
 */
export async function fetchStaticExecutiveMembers(): Promise<ExecutiveType[]> {
  console.log("Fetching executive members from static data");
  return staticExecutiveMembers;
}

/**
 * Fetch contact information (static data)
 */
export async function fetchStaticContactInfo(): Promise<Contact> {
  console.log("Fetching contact info from static data");
  return staticContactInfo;
}

/**
 * Fetch companies (static data)
 */
export async function fetchStaticCompanies(): Promise<Company[]> {
  console.log("Fetching companies from static data");
  return staticCompanies;
}
