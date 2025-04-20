import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attractionsArray: null,
  attractionsCount: null,
  singleAttraction: null,
  attractionInfo: null,
  isSelected: false,
};

const attractionSlice = createSlice({
  name: "attraction",
  initialState,
  reducers: {
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
  },
});

export const { setAttractionsArray, setIsSelected } = attractionSlice.actions;

export default attractionSlice.reducer;
