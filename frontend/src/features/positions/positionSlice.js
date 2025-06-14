import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positionCenterLocation: null,
  positionKeyWord: null,
  positionsArray: [],
  positionsCount: null,
  positionType: null,
  positionRegion: null,
  loading: false,
  error: null,
  source: null,
  isPositionRendered: false,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositionCenterLocation(state, action) {
      state.positionCenterLocation = action.payload;
      console.log("setPositionCenterLocation", action.payload);
    },
    setPositionKeyWord(state, action) {
      state.positionKeyWord = action.payload;
      console.log("setPositionKeyWord", action.payload);
    },
    setPositionsArray(state, action) {
      state.positionsArray = action.payload;
    },
    setPositionsCount(state, action) {
      state.positionsCount = action.payload;
    },
    setPositionType(state, action) {
      state.positionType = action.payload;
    },
    setPositionRegion(state, action) {
      state.positionRegion = action.payload;
      console.log("setPositionRegion", action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSource(state, action) {
      state.source = action.payload;
    },
    setIsPositionRendered(state, action) {
      state.isPositionRendered = action.payload;
    },
    clearPositionSlice(state) {
      state.positionCenterLocation = null;
      state.positionKeyWord = null;
      state.positionsArray = [];
      state.positionsCount = null;
      state.positionType = null;
      state.positionRegion = null;
      state.isPositionRendered = false;
      state.loading = false;
      state.error = null;
      state.source = null;
    },
  },
});

export const {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionsArray,
  setPositionsCount,
  setPositionType,
  setPositionRegion,
  setError,
  setLoading,
  setIsPositionRendered,
  clearPositionSlice,
} = positionSlice.actions;

export default positionSlice.reducer;
