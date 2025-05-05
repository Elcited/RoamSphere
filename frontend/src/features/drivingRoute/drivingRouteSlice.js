import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routesInfo: null,
  routesPolylines: null,
  routesCities: null,
  routesInstructions: null,
  routesNavigations: null,
  routesOrientations: null,
  routesRoadCities: null,
  routesRoadDistance: null,
  routesRoadStatus: null,
  selectedRoute: null,
};

const drivingRoute = createSlice({
  name: "drivingRoute",
  initialState,
  reducers: {
    setRoutesInfo(state, action) {
      state.routesInfo = action.payload;
    },
    setRoutesPolylines(state, action) {
      state.routesPolylines = action.payload;
    },
    setRoutesCities(state, action) {
      state.routesCities = action.payload;
    },
    setRoutesInstructions(state, action) {
      state.routesInstructions = action.payload;
    },
    setRoutesNavigations(state, action) {
      state.routesNavigations = action.payload;
    },
    setRoutesOrientations(state, action) {
      state.routesOrientations = action.payload;
    },
    setRoutesRoadCities(state, action) {
      state.routesRoadCities = action.payload;
    },
    setRoutesRoadDistance(state, action) {
      state.routesRoadDistance = action.payload;
    },
    setRoutesRoadStatus(state, action) {
      state.routesRoadStatus = action.payload;
    },
    setDrivingSelectedRoute(state, action) {
      state.selectedRoute = action.payload;
    },
  },
});

export const {
  setRoutesInfo,
  setRoutesPolylines,
  setRoutesCities,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesOrientations,
  setRoutesRoadCities,
  setRoutesRoadDistance,
  setRoutesRoadStatus,
  setDrivingSelectedRoute,
} = drivingRoute.actions;

export default drivingRoute.reducer;
