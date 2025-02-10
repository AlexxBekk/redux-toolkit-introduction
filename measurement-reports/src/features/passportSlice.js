import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  date: "",
  operator: "",
};

const passportSlice = createSlice({
  name: "passportData",
  initialState,
  reducers: {
    setPassportData(state, action) {
      const { name, date, operator } = action.payload;
      state.name = name;
      state.date = date;
      state.operator = operator;
    },
  },
});

export const { setPassportData } = passportSlice.actions;
export default passportSlice.reducer;

export const selectPassport = (state) => {
  return state.passport;
};
