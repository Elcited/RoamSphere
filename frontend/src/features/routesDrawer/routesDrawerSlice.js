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
      console.log("isRoutesDrawerOpen", state.isRoutesDrawerOpen);
    },
  },
});

export const { setIsRoutesDrawerOpen } = routesDrawerSlice.actions;

export default routesDrawerSlice.reducer;
