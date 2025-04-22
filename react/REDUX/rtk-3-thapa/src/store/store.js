import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/index";
import todoReducer from "./todo/index";
import bmiReducer from "./BMI";
import noteReducer from "./note";
import { loadState, saveState } from "./storage/localstorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    bmi: bmiReducer,
    note: noteReducer,
  },
  preloadedState: {
    bmi: persistedState?.bmi,
    todo: persistedState?.todo,
  },
});

store.subscribe(() => {
  saveState({
    bmi: store.getState().bmi,
    todo: store.getState().todo,
  });
});
