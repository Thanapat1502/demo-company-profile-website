import { create } from "zustand";

export interface WebLabels {
  key: string;
  text: string; // Main text content (mapped from database 'value' field)
  updated_at?: string;
}

type State = {
  webLabels: WebLabels[];
  loading: boolean;
  success: boolean;
  error: string | null;
  fetchWebLabels: () => Promise<void>;
  editWebLabel: (key: string, text: string) => Promise<void>;
};

export const useWebLabelStore = create<State>((set, get) => ({
  webLabels: [],
  loading: false,
  success: false,
  error: null,

  fetchWebLabels: async () => {
    set({ loading: true, error: null, success: false });
    const res = await fetch("/api/web-labels");
    const { data, error } = await res.json();
    if (error) set({ error: error.message, loading: false });
    else {
      // Map database 'value' field to component's expected 'text' field
      const mappedData =
        data?.map((item: any) => ({
          key: item.key,
          text: item.value, // Map value to text
          updated_at: item.updated_at,
        })) || [];
      set({ webLabels: mappedData, loading: false, success: true });
    }
  },

  editWebLabel: async (key, text) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/web-labels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, text }),
      });
      const { error } = await res.json();
      if (error) {
        set({ error: error, loading: false });
      } else {
        set({ success: true, loading: false });
        get().fetchWebLabels();
      }
    } catch (err) {
      set({ error: "Failed to update label", loading: false });
    }
  },
}));
