import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attractionCenterLocation: null,
  attractionsArray: [],
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
    clearAttractionSlice(state) {
      state.attractionCenterLocation = null;
      state.attractionsArray = [];
      state.attractionsCount = null;
      state.singleAttraction = null;
      state.attractionInfo = null;
      state.isSelected = false;
      state.isAttractionRendered = false;
    },
  },
});

export const {
  setAttractionCenterLocation,
  setAttractionsArray,
  setIsSelected,
  setIsAttractionRendered,
  clearAttractionSlice,
} = attractionSlice.actions;

export default attractionSlice.reducer;
