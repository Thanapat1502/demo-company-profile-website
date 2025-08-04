import { create } from "zustand";

export interface Reference {
  id: string; // UUID
  name_th: string;
  name_en: string;
  type_th: string;
  type_en: string;
  location_th: string;
  location_en: string;
  open_at: string; // ISO datetime string
  galleries: string[];
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
