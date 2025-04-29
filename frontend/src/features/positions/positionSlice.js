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
      console.log("positionCenterLocation", action.payload);
    },
    setPositionKeyWord(state, action) {
      state.positionKeyWord = action.payload;
      console.log("positionKeyWord", action.payload);
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
} = positionSlice.actions;

export default positionSlice.reducer;
