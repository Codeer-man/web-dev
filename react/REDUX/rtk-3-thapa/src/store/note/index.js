import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: [],
};

let id = 0;

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.note,
        push({
          id: id++,
          title: action.payload,
          content: action.payload,
          category: action.payload,
        });
    },
  },
});

export const { addNote } = noteSlice.actions;
export default noteSlice.reducer;
