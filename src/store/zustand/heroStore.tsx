import { create } from "zustand";

interface HeroImage {
  id:
    | "HOME"
    | "ABOUT_MAIN"
    | "ABOUT_HISTORY"
    | "ABOUT_VISION"
    | "ABOUT_EXECUTIVE"
    | "PRODUCTS_SERVICE"
    | "NEWS"
    | "CONTACT"
    | "REFERENCE";
  image_url: string[];
}

type State = {
  heroImages: HeroImage[];
  pageHeroImage: HeroImage | null;
  fetchHeroImages: () => Promise<void>;
  fetchHeroImageById: (id: string) => Promise<HeroImage | null>;
  updateHeroImages: (id: string, updatedImage: HeroImage) => Promise<void>;
  error: string | null;
  loading: boolean;
};

export const useHeroStore = create<State>((set, get) => ({
  heroImages: [],
  pageHeroImage: null,
  error: null,
  loading: false,

  fetchHeroImages: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch all hero images for all pages
      const validIds = [
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

      const heroImagesPromises = validIds.map(async (id) => {
        try {
          const res = await fetch(`/api/hero?id=${id}`);
          if (!res.ok) return null;
          const result = await res.json();
          if (result.data && result.data.hero_images) {
            return {
              id: id as HeroImage["id"],
              image_url: result.data.hero_images,
            };
          }
          return null;
        } catch {
          return null;
        }
      });

      const results = await Promise.all(heroImagesPromises);
      const validHeroImages = results.filter(
        (item): item is HeroImage => item !== null
      );

      set({ heroImages: validHeroImages, loading: false });
    } catch (error) {
      set({
        heroImages: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch hero images",
      });
    }
  },

  fetchHeroImageById: async (id: string) => {
    set({ loading: true, error: null });
    console.log("Hero Store I");
    try {
      console.log("Hero Store II");
      const res = await fetch(`/api/hero?id=${id.toUpperCase()}`);
      if (!res.ok) throw new Error("Failed to fetch hero image");
      const result = await res.json();

      if (result.data && result.data.hero_images) {
        console.log("Hero Store III:", result.data.hero_images);

        const heroImage: HeroImage = {
          id: id.toUpperCase() as HeroImage["id"],
          image_url: result.data.hero_images,
        };

        // Update the heroImages array with this new data
        const currentImages = get().heroImages || [];
        const updatedImages = currentImages.filter(
          (img) => img.id !== id.toUpperCase()
        );
        updatedImages.push(heroImage);
        console.log("Hero Store IV:", updatedImages);
        set({ heroImages: updatedImages, loading: false });
        return heroImage;
      }

      set({ loading: false });
      return null;
    } catch (error) {
      console.log("Hero Store IV:", error);
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch hero image",
      });
      return null;
    }
  },
  updateHeroImages: async (id: string, updatedImage: HeroImage) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("id", id.toUpperCase());

      // Assume updatedImage.image_url contains File objects or URLs
      updatedImage.image_url.forEach((img: any) => {
        if (img instanceof File) {
          formData.append("images", img);
        }
      });

      const res = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorResult = await res.json();
        throw new Error(errorResult.error || "Failed to update hero images");
      }

      const result = await res.json();

      // Update the heroImages array with the updated data
      set((state) => ({
        heroImages:
          state.heroImages?.map((h) =>
            h.id === id.toUpperCase()
              ? {
                  id: id.toUpperCase() as HeroImage["id"],
                  image_url: result.data.hero_images,
                }
              : h
          ) || [],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update hero images",
      });
    }
  },
}));
