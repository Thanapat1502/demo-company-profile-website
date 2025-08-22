import { create } from "zustand";

export interface PartnerType {
  id: string;
  name: string;
  logo_url: string;
  updated_at?: string;
}

type State = {
  partners: PartnerType[];
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchPartners: () => Promise<void>;
  addPartner: (data: { name: string; logo?: File | string }) => Promise<void>;
  updatePartner: (
    id: string,
    data: { name: string; logo?: File | string }
  ) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
};

export const usePartnerStore = create<State>((set, get) => ({
  partners: [],
  loading: false,
  success: false,
  error: null,

  fetchPartners: async () => {
    set({ loading: true, error: null, success: false });
    try {
      // Use static data for demo purposes
      const { fetchStaticPartners } = await import(
        "@/lib/static-data/fetchers"
      );
      const data = await fetchStaticPartners();
      set({ partners: data || [], loading: false, success: true });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch partners",
        loading: false,
      });
    }
  },

  addPartner: async ({ name, logo }) => {
    set({ loading: true, error: null, success: false });
    const formData = new FormData();
    formData.append("name", name);
    if (logo && typeof logo !== "string") {
      formData.append("logo", logo);
    } else if (typeof logo === "string") {
      formData.append("logo_url", logo);
    }
    const res = await fetch("/api/partners", {
      method: "POST",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchPartners();
    }
  },

  updatePartner: async (id, { name, logo }) => {
    set({ loading: true, error: null, success: false });
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    if (logo && typeof logo !== "string") {
      formData.append("logo", logo);
    } else if (typeof logo === "string") {
      formData.append("logo_url", logo);
    }
    const res = await fetch("/api/partners", {
      method: "PUT",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchPartners();
    }
  },

  deletePartner: async (id) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch(`/api/partners?id=${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchPartners();
    }
  },
}));
