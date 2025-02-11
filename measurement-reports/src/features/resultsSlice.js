import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  usedDevice: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addResults(state, action) {
      const { results, usedDevice } = action.payload;
      state.results = results;
      state.usedDevice = usedDevice;
    },
    clearResults(state) {
      state.results = initialState.results;
      state.usedDevice = initialState.usedDevice;
    },
  },
});

export const { addResults, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;

export const selectResults = (state) => {
  return state.results.results;
};
export const selectUsedDevice = (state) => {
  return state.results.usedDevice;
};
