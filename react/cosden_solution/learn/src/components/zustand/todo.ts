import { create } from "zustand";

interface item {
  id: Date;
  title: string;
}

type todo = {
  items: item[];
  add: (item: item) => void;
  update: (id: Date, newTitle: string) => void;
  remove: (id: Date) => void;
  status: boolean;
  updateStatus: () => void;
};

export const useTodo = create<todo>((set) => ({
  status: false,
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  update: (id, newTitle) =>
    set((state) => {
      const updateTitle = state.items.map((item) =>
        item.id.getTime() === id.getTime() ? { ...item, title: newTitle } : item
      );

      return { items: updateTitle };
    }),
  remove: (id) =>
    set((state) => {
      const deleteTitle = state.items.filter((item) => item.id !== id);
      console.log(deleteTitle);

      return { items: deleteTitle };
    }),
  updateStatus: () => set((state) => ({ status: !state.status })),
}));
