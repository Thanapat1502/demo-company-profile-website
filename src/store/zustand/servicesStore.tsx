import { create } from "zustand";

export interface ServiceType {
  id: string;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

type State = {
  services: ServiceType[];
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  addService: (data: {
    name_th: string;
    name_en: string;
    description_th: string;
    description_en: string;
    image?: File | string;
  }) => Promise<void>;
  updateService: (
    id: string,
    data: {
      name_th: string;
      name_en: string;
      description_th: string;
      description_en: string;
      image?: File | string;
    }
  ) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  clearMessages: () => void;
};

export const useServiceStore = create<State>((set, get) => ({
  services: [],
  loading: false,
  success: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null, success: false });
    try {
      // Use static data for demo purposes
      const { fetchStaticServices } = await import(
        "@/lib/static-data/fetchers"
      );
      const data = await fetchStaticServices();
      set({ services: data || [], loading: false, success: true });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch services",
        loading: false,
      });
    }
  },

  addService: async ({
    name_th,
    name_en,
    description_th,
    description_en,
    image,
  }) => {
    set({ loading: true, error: null, success: false });
    console.log("Service Store I");
    const formData = new FormData();
    formData.append("name_th", name_th);
    formData.append("name_en", name_en);
    formData.append("description_th", description_th);
    formData.append("description_en", description_en);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    } else if (typeof image === "string") {
      formData.append("image_url", image);
    }
    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });
    const { error } = await res.json();
    if (error) {
      set({ error: error.message, loading: false });
      console.log("Service Store Error:", error);
    } else {
      set({ success: true, loading: false });
      get().fetchServices();
    }
  },

  updateService: async (
    id,
    { name_th, name_en, description_th, description_en, image }
  ) => {
    set({ loading: true, error: null, success: false });
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name_th", name_th);
    formData.append("name_en", name_en);
    formData.append("description_th", description_th);
    formData.append("description_en", description_en);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    } else if (typeof image === "string") {
      formData.append("image_url", image);
    }
    const res = await fetch("/api/services", {
      method: "PUT",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchServices();
    }
  },

  deleteService: async (id) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch(`/api/services?id=${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchServices();
    }
  },
  clearMessages: () => {
    set({ error: null, success: false });
  },
}));
