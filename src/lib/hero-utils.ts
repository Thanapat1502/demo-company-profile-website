import { staticHeroImages } from "@/lib/static-data";

// Hero section IDs type
export type HeroSectionId =
  | "HOME"
  | "ABOUT_MAIN"
  | "ABOUT_HISTORY"
  | "ABOUT_VISION"
  | "ABOUT_EXECUTIVE"
  | "PRODUCTS_SERVICE"
  | "NEWS"
  | "CONTACT"
  | "REFERENCE";

// Hero image data structure
export interface HeroImageData {
  id: HeroSectionId;
  hero_images: string[];
}

/**
 * Server-side function to fetch hero images by ID
 * This function can be used in getServerSideProps, getStaticProps, or Server Components
 * Now uses static data instead of Supabase for demo purposes
 */
export async function getHeroImageById(id: HeroSectionId): Promise<string[]> {
  try {
    console.log(`[SSR] Fetching hero images for: ${id}`);

    // Validate hero section ID
    const validIds: HeroSectionId[] = [
      "HOME",
      "ABOUT_MAIN",
      "ABOUT_HISTORY",
      "ABOUT_VISION",
      "ABOUT_EXECUTIVE",
      "PRODUCTS_SERVICE",
      "NEWS",
      "CONTACT",
      "REFERENCE",
    ];

    if (!validIds.includes(id)) {
      console.warn(`Invalid hero section ID: ${id}`);
      return [];
    }

    // Return static hero images
    const heroImages = staticHeroImages[id] || [];
    console.log(
      `[SSR] Successfully fetched ${heroImages.length} hero images for ${id}`
    );
    return heroImages;
  } catch (err) {
    console.error(`Failed to fetch hero images for ${id}:`, err);
    return [];
  }
}

/**
 * Server-side function to fetch multiple hero images by IDs
 * Useful for preloading multiple hero sections at once
 * Now uses static data instead of Supabase for demo purposes
 */
export async function getMultipleHeroImages(
  ids: HeroSectionId[]
): Promise<Partial<Record<HeroSectionId, string[]>>> {
  try {
    const validIds: HeroSectionId[] = [
      "HOME",
      "ABOUT_MAIN",
      "ABOUT_HISTORY",
      "ABOUT_VISION",
      "ABOUT_EXECUTIVE",
      "PRODUCTS_SERVICE",
      "NEWS",
      "CONTACT",
      "REFERENCE",
    ];

    // Filter out invalid IDs
    const filteredIds = ids.filter((id) => validIds.includes(id));

    if (filteredIds.length === 0) {
      return {};
    }

    // Convert array to record format using static data
    const result: Partial<Record<HeroSectionId, string[]>> = {};

    // Fill in the static data
    filteredIds.forEach((id) => {
      result[id] = staticHeroImages[id] || [];
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch multiple hero images:", err);
    return {};
  }
}
