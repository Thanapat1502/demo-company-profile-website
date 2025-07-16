import { create } from "zustand";
type State = {
  user: null;
  setUser: (user: null) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
