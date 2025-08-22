import { create } from "zustand";

export interface ExecutiveType {
  id: string;
  name_th: string;
  name_en: string;
  position_th: string;
  position_en: string;
  image_url: string;
  updated_at?: string;
}

type State = {
  executiveMembers: ExecutiveType[];
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchExecutiveMembers: () => Promise<void>;
  addExecutiveMember: (data: {
    name_th: string;
    name_en: string;
    position_th: string;
    position_en: string;
    image?: File | string;
  }) => Promise<void>;
  updateExecutiveMember: (
    id: string,
    data: {
      name_th: string;
      name_en: string;
      position_th: string;
      position_en: string;
      image?: File | string;
    }
  ) => Promise<void>;
  deleteExecutiveMember: (id: string) => Promise<void>;
};

export const useExecutiveStore = create<State>((set, get) => ({
  executiveMembers: [],
  loading: false,
  success: false,
  error: null,

  fetchExecutiveMembers: async () => {
    set({ loading: true, error: null, success: false });
    try {
      // Use static data for demo purposes
      const { fetchStaticExecutiveMembers } = await import(
        "@/lib/static-data/fetchers"
      );
      const data = await fetchStaticExecutiveMembers();
      set({ executiveMembers: data || [], loading: false, success: true });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch executive members",
        loading: false,
      });
    }
  },

  addExecutiveMember: async ({
    name_th,
    name_en,
    position_th,
    position_en,
    image,
  }) => {
    set({ loading: true, error: null, success: false });
    const formData = new FormData();
    formData.append("name_th", name_th);
    formData.append("name_en", name_en);
    formData.append("position_th", position_th);
    formData.append("position_en", position_en);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    } else if (typeof image === "string") {
      formData.append("image_url", image);
    }
    const res = await fetch("/api/executive", {
      method: "POST",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchExecutiveMembers();
    }
  },

  updateExecutiveMember: async (
    id,
    { name_th, name_en, position_th, position_en, image }
  ) => {
    set({ loading: true, error: null, success: false });
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name_th", name_th);
    formData.append("name_en", name_en);
    formData.append("position_th", position_th);
    formData.append("position_en", position_en);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    } else if (typeof image === "string") {
      formData.append("image_url", image);
    }
    const res = await fetch("/api/executive", {
      method: "PUT",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchExecutiveMembers();
    }
  },

  deleteExecutiveMember: async (id) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch(`/api/executive?id=${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchExecutiveMembers();
    }
  },
}));
