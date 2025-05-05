import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRoutesDrawerOpen: false,
};

const routesDrawerSlice = createSlice({
  name: "routesDrawer",
  initialState,
  reducers: {
    setIsRoutesDrawerOpen(state, action) {
      state.isRoutesDrawerOpen = action.payload;
    },
  },
});

export const { setIsRoutesDrawerOpen } = routesDrawerSlice.actions;

export default routesDrawerSlice.reducer;
