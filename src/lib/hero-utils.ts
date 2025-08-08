import { supabase } from "@/lib/supabase";

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

    const { data, error } = await supabase
      .from("hero_section")
      .select("hero_images")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No data found, return empty array
        console.log(`[SSR] No hero images found for ID: ${id}`);
        return [];
      }
      console.error(`[SSR] Error fetching hero images for ${id}:`, error);
      return [];
    }

    // Return the hero_images array or empty array if null/undefined
    const heroImages = Array.isArray(data?.hero_images) ? data.hero_images : [];
    // console.log(
    //   `[SSR] Successfully fetched ${heroImages.length} hero images for ${id}`
    // );
    return heroImages;
  } catch (err) {
    console.error(`Failed to fetch hero images for ${id}:`, err);
    return [];
  }
}

/**
 * Server-side function to fetch multiple hero images by IDs
 * Useful for preloading multiple hero sections at once
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

    const { data, error } = await supabase
      .from("hero_section")
      .select("id, hero_images")
      .in("id", filteredIds);

    if (error) {
      console.error("Error fetching multiple hero images:", error);
      return {};
    }

    // Convert array to record format
    const result: Partial<Record<HeroSectionId, string[]>> = {};

    // Initialize all requested IDs with empty arrays
    filteredIds.forEach((id) => {
      result[id] = [];
    });

    // Fill in the actual data
    data?.forEach((item) => {
      if (item.id && Array.isArray(item.hero_images)) {
        result[item.id as HeroSectionId] = item.hero_images;
      }
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch multiple hero images:", err);
    return {};
  }
}
