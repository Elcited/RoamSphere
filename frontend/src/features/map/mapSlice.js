import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMapLoading: false,
  isSearchPanelExpand: false,
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
    setIsSearchPanelExpand(state, action) {
      state.isSearchPanelExpand = action.payload;
    },
  },
});

export const { setMapState, setMapMode, setIsSearchPanelExpand } =
  mapSlice.actions;

export default mapSlice.reducer;
