import { NextRequest } from "next/server";
import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";
import { Content } from "@/store/zustand/contentStore";
import { PartnerType } from "@/store/zustand/partnerStore";

// Import the API route handlers directly for SSR
import { GET as getServices } from "@/app/api/services/route";
import { GET as getProducts } from "@/app/api/products/route";
import { GET as getContents } from "@/app/api/contents/route";
import { GET as getPartners } from "@/app/api/partners/route";

/**
 * Server-side function to fetch all services
 * @returns Promise<ServiceType[]>
 */
export async function fetchServicesSSR(): Promise<ServiceType[]> {
  try {
    // Create a mock NextRequest object for the API handler
    const request = new NextRequest("http://localhost:3002/api/services", {
      method: "GET",
    });

    // Call the API route handler directly during SSR
    const response = await getServices(request);

    if (!response.ok) {
      console.error(`Error fetching services: ${response.status}`);
      return [];
    }

    const result = await response.json();

    // Handle the actual API response structure
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Invalid services API response:", result);
      return [];
    }
  } catch (error) {
    console.error("Server error fetching services:", error);
    return [];
  }
}

/**
 * Server-side function to fetch all products
 * @returns Promise<ProductType[]>
 */
export async function fetchProductsSSR(): Promise<ProductType[]> {
  try {
    // Create a mock NextRequest object for the API handler
    const request = new NextRequest("http://localhost:3002/api/products", {
      method: "GET",
    });

    // Call the API route handler directly during SSR
    const response = await getProducts(request);

    if (!response.ok) {
      console.error(`Error fetching products: ${response.status}`);
      return [];
    }

    const result = await response.json();

    // Handle the actual API response structure (products API returns { products: [...] })
    if (Array.isArray(result.products)) {
      return result.products;
    } else if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Invalid products API response:", result);
      return [];
    }
  } catch (error) {
    console.error("Server error fetching products:", error);
    return [];
  }
}

/**
 * Server-side function to fetch content data
 * @param page - The page identifier (e.g., "HOME")
 * @returns Promise<Content | null>
 */
export async function fetchContentSSR(page: string): Promise<Content | null> {
  try {
    // Create a mock NextRequest object for the API handler
    const request = new NextRequest(
      `http://localhost:3002/api/contents?page=${encodeURIComponent(page)}`,
      {
        method: "GET",
      }
    );

    // Call the API route handler directly during SSR
    const response = await getContents(request);

    if (!response.ok) {
      console.error(`Error fetching content: ${response.status}`);
      return null;
    }

    const result = await response.json();

    // Handle the actual API response structure
    if (result.data) {
      // Return the first item if it's an array, or the data directly
      return result.data; // Array.isArray(result.data) ? result.data[0] : result.data;
    } else {
      console.error("Invalid content API response:", result);
      return null;
    }
  } catch (error) {
    console.error("Server error fetching content:", error);
    return null;
  }
}

/**
 * Server-side function to fetch partners data
 * @returns Promise<PartnerType[]>
 */
export async function fetchPartnersSSR(): Promise<PartnerType[]> {
  try {
    // Call the API route handler directly during SSR (no parameters needed)
    const response = await getPartners();

    if (!response.ok) {
      console.error(`Error fetching partners: ${response.status}`);
      return [];
    }

    const result = await response.json();

    // Handle the actual API response structure
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Invalid partners API response:", result);
      return [];
    }
  } catch (error) {
    console.error("Server error fetching partners:", error);
    return [];
  }
}

/**
 * Server-side function to fetch all homepage data
 * @returns Promise<{ services: ServiceType[], products: ProductType[], content: any, partners: any[] }>
 */
export async function fetchHomePageDataSSR(): Promise<{
  services: ServiceType[];
  products: ProductType[];
  content: Content | null;
  partners: PartnerType[];
}> {
  try {
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
