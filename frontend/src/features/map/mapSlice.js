import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMapLoading: false,
  isSearchPanelExpand: false,
  mapMode: "",
  currentCenterLocation: "",
  fallbackCenterLocation: "北京",
  isGetMapCenter: false,
  useEndAsCenter: false,
  hasRouteEnd: false,
  hawkEyeOpen: false,
  scaleOpen: false,
  compassOpen: false,
  zoomOpen: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapState(state, action) {
      state.isMapLoading = action.payload;
    },
    setIsSearchPanelExpand(state, action) {
      state.isSearchPanelExpand = action.payload;
    },
    setMapMode(state, action) {
      state.mapMode = action.payload;
    },
    setCurrentCenterLocation(state, action) {
      state.currentCenterLocation = action.payload;
      console.log("currentCenterLocation", state.currentCenterLocation);
    },
    setFallbackCenterLocation(state, action) {
      state.fallbackCenterLocation = action.payload;
    },
    setIsGetMapCenter(state, action) {
      state.isGetMapCenter = action.payload;
    },
    setUseEndAsCenter(state, action) {
      state.useEndAsCenter = action.payload;
      console.log("setUseEndAsCenter", state.useEndAsCenter);
    },
    setHasRouteEnd(state, action) {
      state.hasRouteEnd = action.payload;
    },
    setHawkEyeOpen(state, action) {
      state.hawkEyeOpen = action.payload;
    },
    setScaleOpen(state, action) {
      state.scaleOpen = action.payload;
    },
    setCompassOpen(state, action) {
      state.compassOpen = action.payload;
    },
    setZoomOpen(state, action) {
      state.zoomOpen = action.payload;
    },
  },
});

export const {
  setMapState,
  setIsSearchPanelExpand,
  setMapMode,
  setCurrentCenterLocation,
  setFallbackCenterLocation,
  setIsGetMapCenter,
  setUseEndAsCenter,
  setHasRouteEnd,
  setHawkEyeOpen,
  setScaleOpen,
  setCompassOpen,
  setZoomOpen,
} = mapSlice.actions;

export default mapSlice.reducer;
