import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setName } = positionSlice.actions;

export default positionSlice.reducer;
