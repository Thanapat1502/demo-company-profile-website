import { create } from "zustand";

export interface PartberType {
  id: string;
  image: string;
}

type State = {
  partners: PartberType[] | null;
  fetchPartners: () => void;
  addPartner: (partner: PartberType) => void;
  deletePartner: (id: string) => void;
  updatePartner: (id: string, updatedPartner: PartberType) => void;
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
