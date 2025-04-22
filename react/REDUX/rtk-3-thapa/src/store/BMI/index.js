import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 0,
  weight: 0,
  bmi: 0,
};
const bmiSlice = createSlice({
  name: "bmi",
  initialState,
  reducers: {
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    calculateBMR: (state, action) => {
      const heightInMeter = state.height / 100;
      if (heightInMeter > 0) {
        state.bmi = state.weight / (heightInMeter * heightInMeter).toFixed(2);
      }
    },
  },
});

export const { setHeight, setWeight, calculateBMR } = bmiSlice.actions;
export default bmiSlice.reducer;
