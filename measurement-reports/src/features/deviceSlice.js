import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [],
  selectedDevice: null,
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices(state, action) {
      state.devices = action.payload;
    },
    selectDevice(state, action) {
      state.selectedDevice = action.payload;
    },
  },
});

export const { setDevices, selectDevice } = deviceSlice.actions;
export default deviceSlice.reducer;

export const selectDevices = (state) => state.devices.devices;

export const selectSelectedDevice = (state) => state.devices.selectedDevice;
