import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startLocation: "",
  endLocation: "",
  isLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setStartLocation(state, action) {
      state.startLocation = action.payload;
    },
    setEndLocation(state, action) {
      state.endLocation = action.payload;
    },
    onSearch(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setStartLocation, setEndLocation, onSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
