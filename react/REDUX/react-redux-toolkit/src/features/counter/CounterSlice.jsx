import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    increaseByAmount: (state, amount) => {
      state.value += Number(amount.payload);
    },
  },
});

export const { increment, decrement, increaseByAmount } = counterSlice.actions;

export default counterSlice.reducer;
