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
    clearTransitRoute: state => {
      state.routeList = [];
      state.selectedRoute = 0;
      state.startLocation = null;
      state.endLocation = null;
      state.travelMode = "transit";
    },
  },
});

export const {
  setRoutesInfo,
  setTransitSelectedRoute,
  clearTransitRoutes,
  clearTransitRoute,
} = transitRouteSlice.actions;

export default transitRouteSlice.reducer;
