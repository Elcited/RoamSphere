import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMapLoading: false,
  mapMode: "",
  overlays: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapState(state, action) {
      state.isMapLoading = action.payload;
    },
    setMapMode(state, action) {
      state.mapMode = action.payload;
    },
  },
});

export const { setMapState, setMapMode, addOverlay, clearOverlays } =
  mapSlice.actions;

export default mapSlice.reducer;
