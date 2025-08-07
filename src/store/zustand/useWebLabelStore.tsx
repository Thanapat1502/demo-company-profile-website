import { create } from "zustand";

export interface WebLabels {
  id: string;
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
  editWebLabel: (id: string, text: string) => Promise<void>;
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
          id: item.id,
          key: item.key,
          text: item.value, // Map value to text
          updated_at: item.updated_at,
        })) || [];
      set({ webLabels: mappedData, loading: false, success: true });
    }
  },

  editWebLabel: async (id, text) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/web-labels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text }),
      });
      const { data, error } = await res.json();
      if (error) {
        set({ error: error, loading: false });
      } else {
        set({ success: true, loading: false });
        // Refresh the data to get updated values
        get().fetchWebLabels();
      }
    } catch (err) {
      set({ error: "Failed to update label", loading: false });
    }
  },
}));
