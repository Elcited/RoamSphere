import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "",
  end: "",
  strategy: null,
  travelMode: null,
  strategyList: [
    {
      strategy: 0,
      title: "速度优先",
      desc: "优先考虑时间，不一定最短距离",
    },
    {
      strategy: 1,
      title: "不走收费",
      desc: "避开收费路段，耗时最少",
    },
    {
      strategy: 2,
      title: "综合最快",
      desc: "兼顾距离和耗时，常规推荐",
    },
    {
      strategy: 32,
      title: "默认推荐",
      desc: "高德地图默认推荐策略",
    },
    {
      strategy: 33,
      title: "躲避拥堵",
      desc: "实时避开拥堵路段",
    },
    {
      strategy: 34,
      title: "高速优先",
      desc: "尽量走高速",
    },
    {
      strategy: 35,
      title: "不走高速",
      desc: "避免使用高速路段",
    },
    {
      strategy: 36,
      title: "少收费",
      desc: "尽可能减少收费",
    },
    {
      strategy: 37,
      title: "大路优先",
      desc: "优先选择主干道",
    },
    {
      strategy: 38,
      title: "速度最快",
      desc: "只考虑时间，速度至上",
    },
    {
      strategy: 39,
      title: "拥堵+高速优先",
      desc: "避开拥堵并优先走高速",
    },
    {
      strategy: 40,
      title: "拥堵+不走高速",
      desc: "避开拥堵且不走高速",
    },
    {
      strategy: 41,
      title: "拥堵+少收费",
      desc: "避开拥堵并尽量省钱",
    },
    {
      strategy: 42,
      title: "少收费+不走高速",
      desc: "省钱又不走高速",
    },
    {
      strategy: 43,
      title: "拥堵+省钱+不走高速",
      desc: "最省钱路线，避开拥堵和高速",
    },
    {
      strategy: 44,
      title: "拥堵+大路优先",
      desc: "避开拥堵并优先走主干道",
    },
    {
      strategy: 45,
      title: "拥堵+速度最快",
      desc: "避开拥堵同时追求最快速度",
    },
  ],
  isClickNavigation: false,
  highlightedSegment: null,
  isRouteRendered: false,
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
} = routeSlice.actions;

export default routeSlice.reducer;
