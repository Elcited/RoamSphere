import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  isPlaceDetailPanelVisible: false,
  isSearchPanelExpanded: false,
  selectedPlaceIndex: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    activateSearch: (state, action) => {
      state.isActive = true;
      state.keyword = action.payload;
    },
    setPlaceDetailPanelVisible(state, action) {
      state.isPlaceDetailPanelVisible = action.payload;
    },
    setSearchPanelExpanded(state, action) {
      state.isSearchPanelExpanded = action.payload;
    },
    setSelectedPlaceIndex(state, action) {
      state.selectedPlaceIndex = action.payload;
    },
    resetSearch: state => {
      state.isActive = false;
    },
  },
});

export const {
  activateSearch,
  resetSearch,
  setPlaceDetailPanelVisible,
  setSearchPanelExpanded,
  setSelectedPlaceIndex,
} = searchSlice.actions;
export default searchSlice.reducer;
