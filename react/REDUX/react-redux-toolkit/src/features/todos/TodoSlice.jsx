import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    filter: "all",
  },
  reducers: {
    addtodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        texy: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addtodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
