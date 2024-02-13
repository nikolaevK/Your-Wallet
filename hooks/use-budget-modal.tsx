import { create } from "zustand";

// A small, fast, and scalable barebones state-management solution using simplified flux principles.
// Has a comfy API based on hooks, and isn't boilerplates or opinionated. https://github.com/pmndrs/zustand

interface useBudgetModalInterface {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialBudgetLoad: () => void;
}

export const useBudgetModal = create<useBudgetModalInterface>((set) => ({
  isOpen: false,
  loading: false,
  initialBudgetLoad: () => set({ loading: true }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
