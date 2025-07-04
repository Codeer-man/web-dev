import { create } from "zustand";

type counter = {
  count: number;
  increment: () => void;
  incrementAsync: () => Promise<void>;
  decrement: () => void;
  decrementAsync: () => Promise<void>;
  reset: () => void;
  loading: boolean;
};

export const useCounter = create<counter>((set) => ({
  count: 0,
  loading: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  incrementAsync: async () => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set((state) => ({ count: state.count + 1, loading: false }));
  },
  decrement: () => set((state) => ({ count: state.count - 1 })),
  decrementAsync: async () => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count - 1, loading: false }));
  },
  reset: () => set({ count: 0 }),
}));
