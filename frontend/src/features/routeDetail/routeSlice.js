import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "",
  end: "",
  strategy: null,
  travelMode: null,
  isClickNavigation: false,
  highlightedSegment: null,
  isRouteRendered: false,
  isRoutesLoading: true,
  isRoutesSuccess: false,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setStart(state, action) {
      state.start = action.payload;
    },
    setEnd(state, action) {
      state.end = action.payload;
    },
    setTravelMode(state, action) {
      state.travelMode = action.payload;
    },
    setStrategy(state, action) {
      state.strategy = action.payload;
      console.log(state.strategy);
    },
    setIsClickNavigation(state, action) {
      state.isClickNavigation = action.payload;
    },
    setHighlightedSegment(state, action) {
      state.highlightedSegment = action.payload;
    },
    setIsRouteRendered(state, action) {
      state.isRouteRendered = action.payload;
    },
    setIsRoutesLoading(state, action) {
      state.isRoutesLoading = action.payload;
    },
    setIsRoutesSuccess(state, action) {
      state.isRoutesSuccess = action.payload;
    },
  },
});

export const {
  setStart,
  setEnd,
  setTravelMode,
  setStrategy,
  setRoutesInfo,
  setRoutesPolylines,
  setRoutesCities,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesOrientations,
  setRoutesRoadCities,
  setRoutesRoadDistance,
  setRoutesRoadStatus,
  setIsClickNavigation,
  setHighlightedSegment,
  setIsRouteRendered,
  setIsRoutesLoading,
  setIsRoutesSuccess,
} = routeSlice.actions;

export default routeSlice.reducer;
