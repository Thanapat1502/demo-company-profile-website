import { NextRequest } from "next/server";
import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";
import { Content } from "@/store/zustand/contentStore";
import { PartnerType } from "@/store/zustand/partnerStore";

// Import static data for demo purposes
import {
  staticServices,
  staticProducts,
  staticContent,
  staticPartners,
} from "@/lib/static-data";

// Import the API route handlers directly for SSR (commented out for demo)
// import { GET as getServices } from "@/app/api/services/route";
// import { GET as getProducts } from "@/app/api/products/route";
// import { GET as getContents } from "@/app/api/contents/route";
// import { GET as getPartners } from "@/app/api/partners/route";

/**
 * Server-side function to fetch all services
 * Now returns static data for demo purposes
 * @returns Promise<ServiceType[]>
 */
export async function fetchServicesSSR(): Promise<ServiceType[]> {
  try {
    console.log("Fetching services from static data for demo");
    // Return static services data
    return staticServices;
  } catch (error) {
    console.error("Server error fetching services:", error);
    return [];
  }
}

/**
 * Server-side function to fetch all products
 * Now returns static data for demo purposes
 * @returns Promise<ProductType[]>
 */
export async function fetchProductsSSR(): Promise<ProductType[]> {
  try {
    console.log("Fetching products from static data for demo");
    // Return static products data
    return staticProducts;
  } catch (error) {
    console.error("Server error fetching products:", error);
    return [];
  }
}

/**
 * Server-side function to fetch content data
 * Now returns static data for demo purposes
 * @param page - The page identifier (e.g., "HOME")
 * @returns Promise<Content | null>
 */
export async function fetchContentSSR(page: string): Promise<Content | null> {
  try {
    console.log(`Fetching content for page ${page} from static data for demo`);
    // Return static content data for the specified page
    return staticContent[page] || null;
  } catch (error) {
    console.error("Server error fetching content:", error);
    return null;
  }
}

/**
 * Server-side function to fetch partners data
 * Now returns static data for demo purposes
 * @returns Promise<PartnerType[]>
 */
export async function fetchPartnersSSR(): Promise<PartnerType[]> {
  try {
    console.log("Fetching partners from static data for demo");
    // Return static partners data
    return staticPartners;
  } catch (error) {
    console.error("Server error fetching partners:", error);
    return [];
  }
}

/**
 * Server-side function to fetch all homepage data
 * Now returns static data for demo purposes
 * @returns Promise<{ services: ServiceType[], products: ProductType[], content: any, partners: any[] }>
 */
export async function fetchHomePageDataSSR(): Promise<{
  services: ServiceType[];
  products: ProductType[];
  content: Content | null;
  partners: PartnerType[];
}> {
  try {
    console.log("Fetching homepage data from static data for demo");
    const [services, products, content, partners] = await Promise.all([
      fetchServicesSSR(),
      fetchProductsSSR(),
      fetchContentSSR("HOME"),
      fetchPartnersSSR(),
    ]);

    return {
      services,
      products,
      content,
      partners,
    };
  } catch (error) {
    console.error("Server error fetching homepage data:", error);
    return {
      services: [],
      products: [],
      content: null,
      partners: [],
    };
  }
}
