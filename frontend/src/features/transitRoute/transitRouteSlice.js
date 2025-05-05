import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routeList: [],
  selectedRoute: 0,
  startLocation: null,
  endLocation: null,
  travelMode: "transit",
};

const transitRouteSlice = createSlice({
  name: "transitRoute",
  initialState,
  reducers: {
    setRoutesInfo(state, action) {
      state.routeList = action.payload;
    },
    setTransitSelectedRoute(state, action) {
      state.selectedRoute = action.payload;
    },
    clearTransitRoutes(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setRoutesInfo,
  setTransitSelectedRoute,
  clearTransitRoutes,
  setIsTransitLoading,
  setIsTransitFetched,
} = transitRouteSlice.actions;

export default transitRouteSlice.reducer;
