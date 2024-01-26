import { create } from "zustand";

// A small, fast, and scalable barebones state-management solution using simplified flux principles.
// Has a comfy API based on hooks, and isn't boilerplates or opinionated. https://github.com/pmndrs/zustand

interface useBudgetModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useBudgetModal = create<useBudgetModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
