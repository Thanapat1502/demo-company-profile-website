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
    | "CONTACT";
  image_url: string[];
}

type State = {
  heroImages: HeroImage[] | null;
  fetchHeroImages: () => void;
  updateHeroImages: (id: string, updatedImage: HeroImage) => void;
};

export const useHeroStore = create<State>((set) => ({
  heroImages: null,
  fetchHeroImages: async () => {
    try {
      const res = await fetch("/api/hero");
      if (!res.ok) throw new Error("Failed to fetch hero images");
      const data = await res.json();
      set({ heroImages: data });
    } catch {
      set({ heroImages: [] });
      // Optionally handle error state
    }
  },
  updateHeroImages: async (id: string, updatedImage: HeroImage) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
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
      if (!res.ok) throw new Error("Failed to update hero images");
      const updated = await res.json();
      set((state) => ({
        heroImages:
          state.heroImages?.map((h) => (h.id === id ? updated : h)) || [],
      }));
    } catch {
      // Optionally handle error state
    }
  },
}));
