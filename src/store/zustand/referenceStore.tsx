import { create } from "zustand";

export interface Reference {
  id: string; // UUID
  name_th: string;
  name_en: string;
  type_th: string;
  type_en: string;
  location_th: string;
  location_en: string;
  open_at: string; // ISO datetime string
  galleries: string[];
  thumbnail: string;
}
export interface OverseaProject {
  id: string; // UUID
  brand: string;
  type_th: string;
  type_en: string;
  project_name_th: string;
  project_name_en: string;
  country_th: string;
  country_en: string;
}

type State = {
  references: Reference[] | null;
  overseaProjects: OverseaProject[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;

  fetchReference: () => Promise<void>;
  addReference: (reference: FormData | Omit<Reference, "id">) => Promise<void>;
  deleteReference: (id: string) => Promise<void>;
  updateReference: (
    id: string,
    updatedProject: FormData | Omit<Reference, "id">
  ) => Promise<void>;

  fetchOverseaProjects: () => Promise<void>;
  addOverseaProject: (project: Omit<OverseaProject, "id">) => Promise<void>;
  deleteOverseaProject: (id: string) => Promise<void>;
  updateOverseaProject: (
    id: string,
    updatedProject: Omit<OverseaProject, "id">
  ) => Promise<void>;
};

export const useReferenceStore = create<State>((set) => ({
  //For reference
  references: null,
  overseaProjects: null,
  loading: false,
  error: null,
  success: false,

  fetchReference: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/references");
      const { data, error } = await res.json();
      if (error) throw new Error(error.message || "Failed to fetch references");
      set({ references: data || [], loading: false, success: true });
    } catch (err) {
      set({
        references: [],
        loading: false,
        error:
          err instanceof Error ? err.message : "Failed to fetch references",
      });
    }
  },

  addReference: async (reference: FormData | Omit<Reference, "id">) => {
    set({ loading: true, error: null, success: false });
    console.log("Reference Store I");
    try {
      console.log("Reference Store II");
      let formData: FormData;

      if (reference instanceof FormData) {
        formData = reference;
      } else {
        formData = new FormData();
        formData.append("name_th", reference.name_th);
        formData.append("name_en", reference.name_en);
        formData.append("type_th", reference.type_th);
        formData.append("type_en", reference.type_en);
        formData.append("location_th", reference.location_th);
        formData.append("location_en", reference.location_en);
        formData.append("opened_at", reference.open_at);

        // Handle galleries as JSON for now
        if (reference.galleries && reference.galleries.length > 0) {
          formData.append(
            "galleries_json",
            JSON.stringify(reference.galleries)
          );
        }
      }

      const res = await fetch("/api/references", {
        method: "POST",
        body: formData,
      });
      const { data, error } = await res.json();
      console.log("Reference Store III");
      if (error) {
        console.log("Reference Store xIII:", error);
        throw new Error(error.message || "Failed to add reference");
      }

      set((state) => ({
        references: state.references
          ? [data[0], ...state.references]
          : [data[0]],
        loading: false,
        success: true,
      }));
    } catch (err) {
      console.log("Reference Store Error:", err);
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to add reference",
      });
    }
  },
  deleteReference: async (id: string) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`/api/references?id=${id}`, {
        method: "DELETE",
      });
      const { error } = await res.json();
      if (error) throw new Error(error.message || "Failed to delete reference");

      set((state) => ({
        references: state.references?.filter((r) => r.id !== id) || [],
        loading: false,
        success: true,
      }));
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error ? err.message : "Failed to delete reference",
      });
    }
  },

  updateReference: async (
    id: string,
    updatedProject: FormData | Omit<Reference, "id">
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      let formData: FormData;

      if (updatedProject instanceof FormData) {
        formData = updatedProject;
        // Ensure ID is set
        if (!formData.has("id")) {
          formData.append("id", id);
        }
      } else {
        formData = new FormData();
        formData.append("id", id);
        formData.append("name_th", updatedProject.name_th);
        formData.append("name_en", updatedProject.name_en);
        formData.append("type_th", updatedProject.type_th);
        formData.append("type_en", updatedProject.type_en);
        formData.append("location_th", updatedProject.location_th);
        formData.append("location_en", updatedProject.location_en);
        formData.append("opened_at", updatedProject.open_at);

        // Handle galleries as JSON for now
        if (updatedProject.galleries && updatedProject.galleries.length > 0) {
          formData.append(
            "galleries_json",
            JSON.stringify(updatedProject.galleries)
          );
        }
      }

      const res = await fetch("/api/references", {
        method: "PUT",
        body: formData,
      });
      const { data, error } = await res.json();
      if (error) throw new Error(error.message || "Failed to update reference");

      set((state) => ({
        references:
          state.references?.map((r) => (r.id === id ? data[0] : r)) || [],
        loading: false,
        success: true,
      }));
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error ? err.message : "Failed to update reference",
      });
    }
  },

  //For oversea
  fetchOverseaProjects: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/references_oversea");
      const { data, error } = await res.json();
      if (error)
        throw new Error(error.message || "Failed to fetch oversea projects");
      set({ overseaProjects: data || [], loading: false, success: true });
    } catch (err) {
      set({
        overseaProjects: [],
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch oversea projects",
      });
    }
  },

  addOverseaProject: async (project: Omit<OverseaProject, "id">) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/references_oversea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const { data, error } = await res.json();
      if (error)
        throw new Error(error.message || "Failed to add oversea project");

      set((state) => ({
        overseaProjects: state.overseaProjects
          ? [data, ...state.overseaProjects]
          : [data],
        loading: false,
        success: true,
      }));
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error ? err.message : "Failed to add oversea project",
      });
    }
  },
  deleteOverseaProject: async (id: string) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`/api/references_oversea?id=${id}`, {
        method: "DELETE",
      });
      const { error } = await res.json();
      if (error)
        throw new Error(error.message || "Failed to delete oversea project");

      set((state) => ({
        overseaProjects:
          state.overseaProjects?.filter((p) => p.id !== id) || [],
        loading: false,
        success: true,
      }));
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to delete oversea project",
      });
    }
  },

  updateOverseaProject: async (
    id: string,
    updatedProject: Omit<OverseaProject, "id">
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/references_oversea", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedProject, id }),
      });
      const { data, error } = await res.json();
      if (error)
        throw new Error(error.message || "Failed to update oversea project");

      set((state) => ({
        overseaProjects:
          state.overseaProjects?.map((p) => (p.id === id ? data : p)) || [],
        loading: false,
        success: true,
      }));
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to update oversea project",
      });
    }
  },
}));
