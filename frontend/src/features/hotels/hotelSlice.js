import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelCenterLocation: null,
  hotelsArray: [],
  hotelsCount: null,
  singleHotel: null,
  loading: false,
  error: null,
  source: null,
  isHotelRendered: false,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelsArray(state, action) {
      state.hotelsArray = action.payload;
      state.hotelsCount = action.payload.length;
      state.source = action.payload.source;
    },
    setHotelCenterLocation(state, action) {
      state.hotelCenterLocation = action.payload;
    },
    setSingleHotel(state, action) {
      state.singleHotel = action.payload;
    },
    setSource(state, action) {
      state.source = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsHotelRendered(state, action) {
      state.isHotelRendered = action.payload;
    },
    clearHotelSlice(state) {
      state.hotelCenterLocation = null;
      state.hotelsArray = [];
      state.hotelsCount = null;
      state.singleHotel = null;
      state.loading = false;
      state.source = null;
      state.isHotelRendered = false;
    },
  },
});

export const {
  setHotelCenterLocation,
  setLoading,
  setError,
  setHotelsArray,
  setSingleHotel,
  setSource,
  setIsHotelRendered,
  clearHotelSlice,
} = hotelSlice.actions;

export default hotelSlice.reducer;
