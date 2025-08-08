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
  publish_at?: string;
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
  highlightedNews: News[];
  newsDetail: News | null;
  tags: NewsTag[];
  loading: boolean;
  success: string | boolean;
  error: string | null;
  categories: Category[];
  fetchCategories: () => Promise<void>;
  fetchNews: () => Promise<void>;
  fetchNewsDetail: (id: string) => Promise<null>;
  fetchHighlightedNews: () => Promise<void>;
  addNews: (data: FormData) => Promise<void>;
  updateNews: (id: string, data: FormData) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  fetchTags: () => Promise<void>;
  addTag: (data: { name: string }) => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
}

export const useNewsStore = create<NewsStoreState>((set, get) => ({
  news: [],
  newsDetail: null,
  highlightedNews: [],
  tags: [],
  categories: [],
  loading: false,
  success: false,
  error: null,

  fetchHighlightedNews: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_highlighted", true)
        .eq("status", "published")
        .order("updated_at", { ascending: false });

      if (error) {
        set({ error: error.message, loading: false });
      } else {
        set({ highlightedNews: data || [], loading: false, error: null });
      }
    } catch (err) {
      set({
        error: `Failed to fetch highlighted news: ${err}`,
        loading: false,
      });
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await fetch("/api/categories");
      const result = await response.json();
      if (result.error) {
        set({ error: result.error, loading: false });
      } else {
        set({ categories: result.data || [], loading: false });
      }
    } catch (error) {
      set({ error: `Failed to fetch categories: ${error}`, loading: false });
    }
  },
  fetchNews: async () => {
    set({ loading: true, error: null, success: false });
    try {
      console.log("🔍 Fetching news articles...");

      const response = await fetch("/api/news");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch news");
      }

      console.log(
        "✅ News articles fetched successfully:",
        result.data?.length || 0,
        "articles"
      );

      // Sort news by created_at descending (newest first) as backup
      const sortedNews = (result.data || []).sort((a: News, b: News) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });

      set({
        news: sortedNews,
        loading: false,
        error: null,
        success: true,
      });
    } catch (err) {
      console.error("❌ Error fetching news:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch news";

      set({
        error: errorMessage,
        loading: false,
        success: false,
      });
    }
  },
  fetchNewsDetail: async (id: string) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`/api/news/${encodeURIComponent(id)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch news detail");
      }
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch news detail");
      }

      if (!result.data) {
        throw new Error("News not found");
      }

      set({
        newsDetail: result.data,
        loading: false,
        error: null,
        success: true,
      });

      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch news detail";
      set({
        newsDetail: null,
        loading: false,
        error: errorMessage,
        success: false,
      });
      return null;
    }
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
      set({
        success: "News article created successfully",
        loading: false,
        error: null,
      });
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
      set({
        success: "News article updated successfully",
        loading: false,
        error: null,
      });
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
      set({
        success: "News article deleted successfully",
        loading: false,
        error: null,
      });
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
        set({ tags: result.data || [], loading: false });
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
