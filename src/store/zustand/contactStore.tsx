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
  business_hour_th?: string;
  business_hour_en?: string;
}

export interface Company {
  id?: string; // UUID
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
  fetchContactInfo: async () => {
    const res = await fetch("/api/contact", {
      credentials: "include",
    });
    const { data, error } = await res.json();
    if (!error && data && data.length > 0) {
      set({ contactInfo: data[0] });
    }
  },
  fetchCompanies: async () => {
    const res = await fetch("/api/companies", {
      credentials: "include",
    });
    const { data, error } = await res.json();
    if (!error) {
      set({ companies: data });
    }
  },
  updateContactInfo: async (updatedContactInfo) => {
    const res = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedContactInfo),
    });
    const { data, error } = await res.json();
    if (!error && data && data.length > 0) {
      set({ contactInfo: data[0] });
    } else {
      console.log("xIII Store Error: ", error);
    }
  },
  addCompany: async (company) => {
    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(company),
    });
    const { data, error } = await res.json();
    if (!error && data) {
      set((state) => ({
        companies: state.companies ? [...state.companies, data[0]] : [data[0]],
      }));
    } else {
      console.log("Store Error: ", error);
    }
  },
  updateCompany: async (id, updatedCompany) => {
    const res = await fetch("/api/companies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...updatedCompany, id }),
    });
    const { data, error } = await res.json();
    if (!error && data && data.length > 0) {
      set((state) => ({
        companies: state.companies
          ? state.companies.map((c) => (c.id === id ? data[0] : c))
          : [data[0]],
      }));
    }
  },
  deleteCompany: async (id) => {
    const res = await fetch("/api/companies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    const { error } = await res.json();
    if (!error) {
      set((state) => ({
        companies: state.companies
          ? state.companies.filter((c) => c.id !== id)
          : [],
      }));
    }
  },
}));
