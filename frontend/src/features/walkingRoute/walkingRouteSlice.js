import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routesInfo: null,
  routesPolylines: null,
  routesCities: null,
  routesInstructions: null,
  routesNavigations: null,
  routesOrientations: null,
  routesWalkTypes: null,
  selectedRoute: null,
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
    setRoutesWalkTypes(state, action) {
      state.routesWalkTypes = action.payload;
    },
    setIsWalkingLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsWalkingFetched(state, action) {
      state.isFetched = action.payload;
    },
    setWalkingSelectedRoute(state, action) {
      state.selectedRoute = action.payload;
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
  setRoutesOrientations,
  setWalkingSelectedRoute,
} = walkingRouteSlice.actions;

export default walkingRouteSlice.reducer;
