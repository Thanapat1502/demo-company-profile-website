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
  error: string | null;
  fetchProducts: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  clearError: () => void;
};

export const useProductStore = create<State>((set, get) => ({
  products: null,
  error: null,
  fetchProducts: async () => {
    try {
      set({ error: null });
      const res = await fetch("/api/products", {
        credentials: "include", // Include cookies for authentication
      });
      if (!res.ok) {
        const data = await res.json();
        set({ error: data.error || "Failed to fetch products", products: [] });
        return;
      }
      const data = await res.json();
      set({ products: data.products, error: null });
    } catch (err: any) {
      set({ products: [], error: err?.message || "Unknown error" });
    }
  },
  addProduct: async (product) => {
    try {
      set({ error: null });
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        const data = await res.json();
        set({ error: data.error || "Failed to add product" });
        return;
      }
      await get().fetchProducts();
    } catch (err: any) {
      console.log("error:", err);
      set({ error: err?.message || "Unknown error" });
    }
  },
  updateProduct: async (id, updatedProduct) => {
    try {
      set({ error: null });
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        const data = await res.json();
        set({ error: data.error || "Failed to update product" });
        return;
      }
      await get().fetchProducts();
    } catch (err: any) {
      set({ error: err?.message || "Unknown error" });
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ error: null });
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });
      if (!res.ok) {
        const data = await res.json();
        set({ error: data.error || "Failed to delete product" });
        return;
      }
      await get().fetchProducts();
    } catch (err: any) {
      set({ error: err?.message || "Unknown error" });
    }
  },
  clearError: () => set({ error: null }),
}));

// Helper for image upload
export async function uploadProductImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", "images/public/products_store");
  const res = await fetch("/api/image-upload", {
    method: "POST",
    credentials: "include", // Include cookies for authentication
    body: formData,
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.url as string;
}
