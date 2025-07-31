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
  loading: boolean;
  error: string | null;
  success: string | null;
  fetchContactInfo: () => Promise<void>;
  fetchCompanies: () => Promise<void>;
  updateContactInfo: (updatedContactInfo: Contact) => Promise<void>;
  addCompany: (company: Company) => Promise<void>;
  updateCompany: (id: string, updatedCompany: Company) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  clearMessages: () => void;
};

export const useContactStore = create<State>((set) => ({
  contactInfo: null,
  companies: null,
  loading: false,
  error: null,
  success: null,

  clearMessages: () => {
    set({ error: null, success: null });
  },

  fetchContactInfo: async () => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await fetch("/api/contact", {
        credentials: "include",
      });
      const { data, error } = await res.json();
      if (!error && data && data.length > 0) {
        set({
          contactInfo: data[0],
          loading: false,
        });
      } else {
        set({
          loading: false,
          error: error || "No contact information found",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to fetch contact information",
      });
    }
  },
  fetchCompanies: async () => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await fetch("/api/companies", {
        credentials: "include",
      });
      const { data, error } = await res.json();
      if (!error) {
        set({
          companies: data,
          loading: false,
        });
      } else {
        set({
          loading: false,
          error: error || "Failed to load companies",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to fetch companies",
      });
    }
  },
  updateContactInfo: async (updatedContactInfo) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedContactInfo),
      });
      const { data, error } = await res.json();
      if (!error && data && data.length > 0) {
        set({
          contactInfo: data[0],
          loading: false,
          success: "Contact information updated successfully",
        });
      } else {
        set({
          loading: false,
          error: error || "Failed to update contact information",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to update contact information",
      });
    }
  },
  addCompany: async (company) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(company),
      });
      const { data, error } = await res.json();
      if (!error && data) {
        set((state) => ({
          companies: state.companies
            ? [...state.companies, data[0]]
            : [data[0]],
          loading: false,
          success: "Company added successfully",
        }));
      } else {
        set({
          loading: false,
          error: error || "Failed to add company",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to add company",
      });
    }
  },
  updateCompany: async (id, updatedCompany) => {
    set({ loading: true, error: null, success: null });
    try {
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
          loading: false,
          success: "Company updated successfully",
        }));
      } else {
        set({
          loading: false,
          error: error || "Failed to update company",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to update company",
      });
    }
  },
  deleteCompany: async (id) => {
    set({ loading: true, error: null, success: null });
    try {
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
          loading: false,
          success: "Company deleted successfully",
        }));
      } else {
        set({
          loading: false,
          error: error || "Failed to delete company",
        });
      }
    } catch (err) {
      set({
        loading: false,
        error: "Failed to delete company",
      });
    }
  },
}));
