import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMapLoading: false,
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
  clickedLngLat: null,
  hasSearchResult: false,
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
    setCurrentCenterLocation(state, action) {
      state.currentCenterLocation = action.payload;
    },
    setFallbackCenterLocation(state, action) {
      state.fallbackCenterLocation = action.payload;
    },
    setIsGetMapCenter(state, action) {
      state.isGetMapCenter = action.payload;
    },
    setUseEndAsCenter(state, action) {
      state.useEndAsCenter = action.payload;
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
    setClickedLngLat(state, action) {
      state.clickedLngLat = action.payload;
    },
    setHasSearchResult(state, action) {
      state.hasSearchResult = action.payload;
    },
  },
});

export const {
  setMapState,
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
  setClickedLngLat,
  setHasSearchResult,
} = mapSlice.actions;

export default mapSlice.reducer;
