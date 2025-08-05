import { create } from "zustand";

export interface ProductType {
  id: string; // UUID
  name_th: string;
  name_en: string;
  description_th?: string;
  description_en?: string;
  image_url: string;
  status: "available" | "unavailable";
  image?: File | string | null; // For file uploads
}

type State = {
  products: ProductType[];
  error: string | null;
  loading: boolean;
  fetchProducts: () => void;
  addProduct: (product: ProductType) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: ProductType) => void;
  clearError: () => void;
};

export const useProductStore = create<State>((set, get) => ({
  products: [],
  error: null,
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
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
      set({ products: data.products, error: null, loading: false });
    } catch (err: any) {
      set({
        products: [],
        error: err?.message || "Unknown error",
        loading: false,
      });
    }
  },
  addProduct: async (product) => {
    set({ loading: true });
    try {
      set({ error: null });

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name_th", product.name_th);
      formData.append("name_en", product.name_en);
      formData.append("description_th", product.description_th || "");
      formData.append("description_en", product.description_en || "");
      formData.append("status", product.status);

      if (product.image && typeof product.image === "object") {
        formData.append("image", product.image);
      } else if (product.image_url) {
        formData.append("image_url", product.image_url);
      }

      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
        body: formData, // Send FormData instead of JSON
      });

      if (!res.ok) {
        const data = await res.json();
        set({ error: data.error || "Failed to add product", loading: false });
        return;
      }

      // Refresh products list
      get().fetchProducts();
    } catch (err: any) {
      console.log("error:", err);
      set({ error: err?.message || "Unknown error", loading: false });
    }
  },
  updateProduct: async (id, updatedProduct) => {
    set({ loading: true });
    try {
      set({ error: null });

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name_th", updatedProduct.name_th);
      formData.append("name_en", updatedProduct.name_en);
      formData.append("description_th", updatedProduct.description_th || "");
      formData.append("description_en", updatedProduct.description_en || "");
      formData.append("status", updatedProduct.status);

      if (updatedProduct.image && typeof updatedProduct.image === "object") {
        formData.append("image", updatedProduct.image);
      } else if (updatedProduct.image_url) {
        formData.append("image_url", updatedProduct.image_url);
      }

      const res = await fetch("/api/products", {
        method: "PUT",
        credentials: "include", // Include cookies for authentication
        body: formData, // Send FormData instead of JSON
      });

      if (!res.ok) {
        const data = await res.json();
        set({
          error: data.error || "Failed to update product",
          loading: false,
        });
        return;
      }

      // Refresh products list
      get().fetchProducts();
    } catch (err: any) {
      set({ error: err?.message || "Unknown error", loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      set({ error: null });
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });
      if (!res.ok) {
        const data = await res.json();
        set({
          error: data.error || "Failed to delete product",
          loading: false,
        });
        return;
      }

      // Refresh products list
      get().fetchProducts();
    } catch (err: any) {
      set({ error: err?.message || "Unknown error", loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));

// Note: Image upload is now handled directly by the /api/products endpoint
