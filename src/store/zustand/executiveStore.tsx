import { create } from "zustand";

export interface ExecutiveType {
  id: string;
  nameTh: string;
  nameEn: string;
  positionTh: string;
  positionEn: string;
  image: string;
}

type State = {
  executiveMembers: ExecutiveType[] | null;
  fetchExecutiveMembers: () => void;
  addExecutiveMembers: (member: ExecutiveType) => void;
  deleteExecutiveMembers: (id: string) => void;
  updateExecutiveMembers: (id: string, updatedMember: ExecutiveType) => void;
};

export const usePartnerSotre = create<State>((set) => ({
  executiveMembers: null,
  fetchExecutiveMembers: async () => {
    const result = null;
    //ADD API call here, table "executive"
    set({ executiveMembers: result });
  },
  addExecutiveMembers: (member) => {
    //ADD API call here, table "executive"
  },
  deleteExecutiveMembers: (id) => {
    //ADD API call here, table "executive"
  },
  updateExecutiveMembers: (id, updatedMember) => {
    //ADD API call here, table "executive"
  },
}));
