import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routesInfo: null,
  routesPolylines: null,
  routesCities: null,
  routesInstructions: null,
  routesNavigations: null,
  routesOrientations: null,
  routesStepDistance: null,
};

const cyclingRouteSlice = createSlice({
  name: "cyclingRoute",
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
  },
});

export const {
  setRoutesCities,
  setRoutesInfo,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesPolylines,
  setRoutesStepDistance,
  setRoutesOrientations,
} = cyclingRouteSlice.actions;

export default cyclingRouteSlice.reducer;
