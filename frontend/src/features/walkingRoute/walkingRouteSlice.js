import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routesInfo: null,
  routesPolylines: null,
  routesCities: null,
  routesInstructions: null,
  routesNavigations: null,
  routesOrientations: null,
  routesStepDistance: null,
  routesWalkTypes: null,
  selectedRoute: 0,
};

const walkingRouteSlice = createSlice({
  name: "walkingRoute",
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
    setRoutesStepDistance(state, action) {
      state.routesStepDistance = action.payload;
    },
    setRoutesWalkTypes(state, action) {
      state.routesWalkTypes = action.payload;
    },
    setWalkingSelectedRoute(state, action) {
      state.selectedRoute = action.payload;
    },
    clearWalkingRoute: state => {
      state.routesInfo = null;
      state.routesPolylines = null;
      state.routesCities = null;
      state.routesInstructions = null;
      state.routesNavigations = null;
      state.routesOrientations = null;
      state.routesStepDistance = null;
      state.routesWalkTypes = null;
      state.selectedRoute = 0;
    },
  },
});

export const {
  setRoutesCities,
  setRoutesInfo,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesPolylines,
  setRoutesWalkTypes,
  setRoutesStepDistance,
  setRoutesOrientations,
  setWalkingSelectedRoute,
  clearWalkingRoute,
} = walkingRouteSlice.actions;

export default walkingRouteSlice.reducer;
