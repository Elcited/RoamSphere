import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startPoint: "",
  endPoint: "",
  routes: [],
  selectedRoute: null,
  routesCount: 0,
  steps: [],
  isError: false,
};

const routesPlanSlice = createSlice({
  name: "routesPlan",
  initialState,
  reducers: {
    setStartPoint(state, action) {
      state.startPoint = action.payload;
    },
    setEndPoint(state, action) {
      state.endPoint = action.payload;
    },
    setRoutes(state, action) {
      const routes = action.payload;

      if (routes.length > 0) {
        const minDistance = Math.min(...routes.map(r => r.distance));
        const minTime = Math.min(...routes.map(r => r.time));

        state.routes = routes.map(route => ({
          ...route,
          label:
            route.distance === minDistance
              ? "🚗 最短距离"
              : route.time === minTime
              ? "⏳ 最短时间"
              : "综合推荐",
          routeStart: route.steps[0]?.start_location,
          routeEnd: route.steps[route.steps.length - 1]?.end_location,
        }));
      }
    },
    setSteps(state, action) {
      state.steps = action.payload;
    },
    setRoutesCount(state, action) {
      state.routesCount = action.payload;
    },
    setIsError(state, action) {
      state.isError = true;
    },
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const {
  setStartPoint,
  setEndPoint,
  setRoutes,
  setSteps,
  setRoutesCount,
  setIsError,
  setSelectedRoute,
} = routesPlanSlice.actions;

export default routesPlanSlice.reducer;
