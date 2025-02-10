import { configureStore } from "@reduxjs/toolkit";
import passportReducer from "../features/passportSlice";
import deviceReducer from "../features/deviceSlice";
import resultsReducer from "../features/resultsSlice";

export const store = configureStore({
  reducer: {
    passport: passportReducer,
    devices: deviceReducer,
    results: resultsReducer,
  },
});
