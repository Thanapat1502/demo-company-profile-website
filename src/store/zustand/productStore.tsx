import { create } from "zustand";

export interface Product {
  id: string; // UUID
  name_th: string;
  name_en: string;
  description_th?: string;
  description_en?: string;
  image_url: string;
  status: "available" | "unavailable";
}

type State = {
  products: Product[] | null;
  fetchProducts: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
};

export const usePartnerSotre = create<State>((set) => ({
  products: null,
  fetchProducts: async () => {
    const result = null;
    //ADD API call here table "products"
    set({ products: result });
  },
  addProduct: (product) => {
    const result = null;
    //ADD API call here table "products"
    set({ products: result });
  },
  updateProduct: (id, updatedProduct) => {
    //ADD API call here table "products"
  },
  deleteProduct: (id) => {
    //ADD API call here table "products"
  },
}));
