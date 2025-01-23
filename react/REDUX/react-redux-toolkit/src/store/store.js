import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/CounterSlice";
import todosReducer from "../features/todos/TodoSlice";
export const Store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
