import { Delta } from "quill";
import { create } from "zustand";

export interface WebLabel {
  key: string; // เช่น "home.greeting"
  th: string;
  en: string;
}

type State = {
  webLabels: WebLabel[] | null;
  fetchWebLabels: () => void;
  editWeblabels: (key: string, updatedWeblabels: WebLabel) => void;
};

export const useContactStore = create<State>((set) => ({
  webLabels: null,
  fetchWebLabels: () => {
    //ADD api call here, table "web_labels"
  },
  editWeblabels: (key: string, updatedWeblabels: WebLabel) => {
    //ADD api call here, table "web_labels"
  },
}));
