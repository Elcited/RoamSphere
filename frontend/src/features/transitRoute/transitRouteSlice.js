import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routesInfo: null,
  transitCount: null,
  transitsDistance: null,
  transitsDuration: null,
  transitsFee: null,
  isAtNights: null,
  transitsStepCount: null,
  transitsStartTime: null,
  transitsEndTime: null,
  transitsTimeTips: null,
  transitsTimeTags: null,
  transitsRouteName: null,
  transitsRailways: null,
  transitsTaxis: null,
  travelMode: null,
  busPolyline: null,
  subwayPolyline: null,
  cityRailwayPolyline: null,
  taxiPolyline: null,
  transitsPolylines: null,
};

const transitRouteSlice = createSlice({
  name: "transitRoute",
  initialState,
  reducers: {
    setRoutesInfo: (state, action) => {
      state.routesInfo = action.payload;
    },
    setTransitCount: (state, action) => {
      state.transitCount = action.payload;
    },
    setTransitsDistance: (state, action) => {
      state.transitsDistance = action.payload;
    },
    setTransitsDuration: (state, action) => {
      state.transitsDuration = action.payload;
    },
    setTransitsFee: (state, action) => {
      state.transitsFee = action.payload;
    },
    setIsAtNights: (state, action) => {
      state.isAtNights = action.payload;
    },
    setTransitsStepCount: (state, action) => {
      state.transitsStepCount = action.payload;
    },
    setTransitsStartTime: (state, action) => {
      state.transitsStartTime = action.payload;
    },
    setTransitsEndTime: (state, action) => {
      state.transitsEndTime = action.payload;
    },
    setTransitsTimeTips: (state, action) => {
      state.transitsTimeTips = action.payload;
    },
    setTransitsTimeTags: (state, action) => {
      state.transitsTimeTags = action.payload;
    },
    setTransitsRouteName: (state, action) => {
      state.transitsRouteName = action.payload;
    },
    setTransitsRailways: (state, action) => {
      state.transitsRailways = action.payload;
    },
    setTransitsTaxis: (state, action) => {
      state.transitsTaxis = action.payload;
    },
    setTravelMode: (state, action) => {
      state.travelMode = action.payload;
    },
    setBusPolyline: (state, action) => {
      state.busPolyline = action.payload;
    },
    setSubwayPolyline: (state, action) => {
      state.subwayPolyline = action.payload;
    },
    setCityRailwayPolyline: (state, action) => {
      state.cityRailwayPolyline = action.payload;
    },
    setTaxiPolyline: (state, action) => {
      state.taxiPolyline = action.payload;
    },
    setTransitsPolylines: (state, action) => {
      state.transitsPolylines = action.payload;
    },
    resetTransitRoute: () => initialState,
  },
});

export const {
  setRoutesInfo,
  setTransitCount,
  setTransitsDistance,
  setTransitsDuration,
  setTransitsFee,
  setIsAtNights,
  setTransitsStepCount,
  setTransitsStartTime,
  setTransitsEndTime,
  setTransitsTimeTips,
  setTransitsTimeTags,
  setTransitsRouteName,
  setTransitsRailways,
  setTransitsTaxis,
  setTravelMode,
  setBusPolyline,
  setSubwayPolyline,
  setCityRailwayPolyline,
  setTaxiPolyline,
  setTransitsPolylines,
  resetTransitRoute,
} = transitRouteSlice.actions;

export default transitRouteSlice.reducer;
