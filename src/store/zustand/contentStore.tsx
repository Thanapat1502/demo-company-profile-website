import { create } from "zustand";

export interface Content {
  id: string;
  page: string;
  type: "gallery" | "video";
  images_url: string[];
  video_url?: string;
  images?: File[]; // For new uploads
  created_at?: string;
  updated_at?: string;
}

export interface ContentUpload {
  page: string;
  type: "gallery" | "video";
  images?: File[];
  video_url?: string;
  existing_images?: string[];
}

type State = {
  content: Content[];
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchContent: (page: string, type?: "gallery" | "video") => Promise<void>;
  createContent: (contentData: ContentUpload) => Promise<Content | null>;
  updateContent: (
    id: string,
    contentData: ContentUpload
  ) => Promise<Content | null>;
  deleteContent: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearSuccess: () => void;
};

export const useContentStore = create<State>((set) => ({
  content: [],
  loading: false,
  success: false,
  error: null,

  fetchContent: async (page: string, type?: "gallery" | "video") => {
    set({ loading: true, error: null });
    try {
      let url = `/api/contents?page=${page}`;
      if (type) {
        url += `&type=${type}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        set({ content: result.data || [], loading: false, success: true });
      } else {
        set({
          error: result.error || "Failed to fetch content",
          loading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch content",
        loading: false,
      });
    }
  },

  createContent: async (contentData: ContentUpload) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("page", contentData.page);
      formData.append("type", contentData.type);

      if (contentData.video_url) {
        formData.append("video_url", contentData.video_url);
      }

      if (contentData.images) {
        contentData.images.forEach((file, index) => {
          formData.append(`image_${index}`, file);
        });
      }

      const response = await fetch("/api/contents", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const newContent = result.data;
        set((state) => ({
          content: [...state.content, newContent],
          loading: false,
          success: true,
        }));
        return newContent;
      } else {
        set({
          error: result.error || "Failed to create content",
          loading: false,
        });
        return null;
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create content",
        loading: false,
      });
      return null;
    }
  },

  updateContent: async (id: string, contentData: ContentUpload) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("page", contentData.page);
      formData.append("type", contentData.type);

      if (contentData.existing_images) {
        formData.append(
          "existing_images",
          JSON.stringify(contentData.existing_images)
        );
      }

      if (contentData.video_url) {
        formData.append("video_url", contentData.video_url);
      }

      if (contentData.images) {
        contentData.images.forEach((file, index) => {
          formData.append(`image_${index}`, file);
        });
      }

      const response = await fetch("/api/contents", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const updatedContent = result.data;
        set((state) => ({
          content: state.content.map((item) =>
            item.id === id ? updatedContent : item
          ),
          loading: false,
          success: true,
        }));
        return updatedContent;
      } else {
        set({
          error: result.error || "Failed to update content",
          loading: false,
        });
        return null;
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update content",
        loading: false,
      });
      return null;
    }
  },

  deleteContent: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/contents?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        set((state) => ({
          content: state.content.filter((item) => item.id !== id),
          loading: false,
          success: true,
        }));
        return true;
      } else {
        set({
          error: result.error || "Failed to delete content",
          loading: false,
        });
        return false;
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete content",
        loading: false,
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: false }),
}));
