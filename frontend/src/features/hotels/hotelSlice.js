import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelCenterLocation: null,
  hotelsArray: [],
  hotelsCount: null,
  singleHotel: null,
  loading: false,
  error: null,
  source: null,
  parsedHotels: [],
  parsedHotelDetail: [],
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
    setParsedHotels(state, action) {
      state.parsedHotels = action.payload;
    },
    setParsedHotelDetail(state, action) {
      state.parsedHotelDetail = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setParsedHotels,
  setParsedHotelDetail,
  setHotelCenterLocation,
  setHotelsArray,
  setSingleHotel,
  setSource,
} = hotelSlice.actions;

export default hotelSlice.reducer;
