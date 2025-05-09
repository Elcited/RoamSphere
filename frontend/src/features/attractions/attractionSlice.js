import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attractionCenterLocation: null,
  attractionsArray: null,
  attractionsCount: null,
  singleAttraction: null,
  attractionInfo: null,
  isSelected: false,
  isAttractionRendered: false,
};

const attractionSlice = createSlice({
  name: "attraction",
  initialState,
  reducers: {
    setAttractionCenterLocation(state, action) {
      state.attractionCenterLocation = action.payload;
    },
    setAttractionsArray(state, action) {
      state.attractionsArray = action.payload;
      state.attractionsCount = action.payload.length;
    },
    setSingleAttraction(state, action) {
      state.singleAttraction = action.payload;
      if (singleAttraction) console.log(singleAttraction);
    },
    setIsSelected(state, action) {
      state.name = action.payload;
    },
    setIsAttractionRendered(state, action) {
      state.isAttractionRendered = action.payload;
    },
  },
});

export const {
  setAttractionCenterLocation,
  setAttractionsArray,
  setIsSelected,
  setIsAttractionRendered,
} = attractionSlice.actions;

export default attractionSlice.reducer;
