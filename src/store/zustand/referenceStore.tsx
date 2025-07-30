import { create } from "zustand";

export interface Reference {
  id: string; // UUID
  client_th: string;
  client_en: string;
  location_th: string;
  location_en: string;
  open_at: string; // ISO datetime string
  description_th: string;
  description_en: string;
  features_th: string[]; // Array of feature strings
  features_en: string[];
  value: number;
  galleries_th: string[]; // Array of image URLs
  galleries_en: string[];
}

type State = {
  partners: Reference[] | null;
  fetchPartners: () => void;
  addPartner: (partner: Reference) => void;
  deletePartner: (id: string) => void;
  updatePartner: (id: string, updatedPartner: Reference) => void;
};

export const usePartnerSotre = create<State>((set) => ({
  partners: null,
  fetchPartners: async () => {
    const result = null;
    set({ partners: result });
  },
  addPartner: (partner) => {},
  deletePartner: (id) => {},
  updatePartner: (id, updatedPartner) => {},
}));
