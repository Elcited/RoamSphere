import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "",
  end: "",
  travelMode: "driving",
  info: null,
  polyline: null,
  strategy: null,
  strategyList: [
    {
      strategy: 2,
      title: "综合最快",
      desc: "兼顾距离和耗时",
      result: null,
      status: "idle",
      source: "default",
    },
    {
      strategy: 0,
      title: "速度优先",
      desc: "优先考虑时间",
      result: null,
      status: "idle",
      source: "default",
    },
    {
      strategy: 1,
      title: "不走收费",
      desc: "避开收费路段",
      result: null,
      status: "idle",
      source: "default",
    },
  ],
  isClickNavigation: false,
  highlightedSegment: null,
};

const routeDetailSlice = createSlice({
  name: "routeDetail",
  initialState,
  reducers: {
    setIsSelected(state, action) {
      state.isSelected = action.payload;
    },
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
    setInfo(state, action) {
      state.info = action.payload;
    },
    setPolyline(state, action) {
      state.polyline = action.payload;
    },
    setIsClickNavigation(state, action) {
      state.isClickNavigation = action.payload;
    },
    setHighlightedSegment(state, action) {
      state.highlightedSegment = action.payload;
    },
  },
});

export const {
  setIsSelected,
  setStart,
  setEnd,
  setTravelMode,
  setStrategy,
  setInfo,
  setPolyline,
  setIsClickNavigation,
  setHighlightedSegment,
} = routeDetailSlice.actions;

export default routeDetailSlice.reducer;
