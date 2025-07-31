import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";

// Quill content type
export interface QuillContent {
  ops?: Array<{
    insert?: string | { image?: string };
    attributes?: Record<string, unknown>;
  }>;
}

export type News = {
  id: string;
  thumbnail?: string;
  title_th: string;
  title_en: string;
  excerpt_th?: string;
  excerpt_en?: string;
  tag_id?: number[];
  body_th?: QuillContent;
  body_en?: QuillContent;
  cat_id?: string;
  is_highlighted?: boolean;
  status?: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  // Legacy fields for backward compatibility
  title?: string;
  subtitle?: string;
  tag?: number[];
};

export type NewsTag = {
  id: number;
  tag_th: string;
  tag_en: string;
};

export type Category = {
  id: string;
  cat_th: string;
  cat_en: string;
  description_th?: string;
  description_en?: string;
  created_at?: string;
  updated_at?: string;
};

interface NewsStoreState {
  news: News[];
  tags: NewsTag[];
  loading: boolean;
  success: boolean;
  error: string | null;
  categories: Category[];
  fetchCategories: () => Promise<void>;
  fetchNews: () => Promise<void>;
  addNews: (data: FormData) => Promise<void>;
  updateNews: (id: string, data: FormData) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  fetchTags: () => Promise<void>;
  addTag: (data: { name: string }) => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
}

export const useNewsStore = create<NewsStoreState>((set, get) => ({
  news: [],
  tags: [],
  categories: [],
  loading: false,
  success: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await fetch("/api/categories");
      const result = await response.json();
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        set({ categories: result.data || [], loading: false, success: true });
      }
    } catch (error) {
      set({ error: `Failed to fetch categories: ${error}`, loading: false });
    }
  },
  fetchNews: async () => {
    set({ loading: true, error: null, success: false });
    const { data, error } = await supabase.from("news").select("*");
    if (error) set({ error: error.message, loading: false });
    else set({ news: data || [], loading: false, success: true });
  },

  addNews: async (formData) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch("/api/news", {
      method: "POST",
      body: formData,
    });
    const { error } = await res.json();
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ success: true, loading: false });
      get().fetchNews();
    }
  },

  updateNews: async (id, formData) => {
    set({ loading: true, error: null, success: false });
    formData.append("id", id);
    const res = await fetch("/api/news", {
      method: "PUT",
      body: formData,
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchNews();
    }
  },

  deleteNews: async (id) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch(`/api/news?id=${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchNews();
    }
  },

  fetchTags: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await fetch("/api/news-tag");
      const result = await response.json();
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        set({ tags: result.data || [], loading: false, success: true });
      }
    } catch {
      set({ error: "Failed to fetch tags", loading: false });
    }
  },

  addTag: async (tagData) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch("/api/news-tag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tagData),
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchTags();
    }
  },

  deleteTag: async (id) => {
    set({ loading: true, error: null, success: false });
    const res = await fetch(`/api/news-tag?id=${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      set({ success: true, loading: false });
      get().fetchTags();
    }
  },
}));
