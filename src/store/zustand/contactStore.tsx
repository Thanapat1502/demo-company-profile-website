import { create } from "zustand";

export interface Contact {
  id: string; // UUID
  tel: string;
  email: string;
  address: string;
  google_map_url?: string;
  line?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  business_hour?: string;
}

export interface Company {
  id: string; // UUID
  name_th: string;
  name_en: string;
  address_th: string;
  address_en: string;
  tel: string;
  email: string;
  business_hour_th?: string;
  business_hour_en?: string;
}

type State = {
  contactInfo: Contact | null;
  companies: Company[] | null;
  fetchContactInfo: () => void;
  fetchCompanies: () => void;
  updateContactInfo: (updatedContactInfo: Contact) => void;
  addCompany: (company: Company) => void;
  updateCompany: (id: string, updatedCompany: Company) => void;
  deleteCompany: (id: string) => void;
};

export const useContactStore = create<State>((set) => ({
  contactInfo: null,
  companies: null,
  fetchContactInfo: () => {
    //ADD API call here, table "contact"
  },
  fetchCompanies: () => {
    //ADD API call here, table "companies"
  },
  updateContactInfo: (updatedContactInfo) => {
    //ADD API call here, table "contact"
  },
  addCompany: (company) => {
    //ADD API call here, table "companies"
  },
  updateCompany: (id, updatedCompany) => {
    //ADD API call here, table "companies"
  },
  deleteCompany: (id) => {
    //ADD API call here, table "companies"
  },
}));
