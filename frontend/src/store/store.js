import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "../features/map/mapSlice";
import routesDrawerReducer from "../features/routesDrawer/routesDrawerSlice";
import routeDetailReducer from "../features/routeDetail/routeDetailSlice";
import attractionReducer from "../features/attractions/attractionSlice";
import hotelReducer from "../features/hotels/hotelSlice";
import positionReducer from "../features/positions/positionSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    routesDrawer: routesDrawerReducer,
    routeDetail: routeDetailReducer,
    attraction: attractionReducer,
    hotel: hotelReducer,
    position: positionReducer,
  },
});

export default store;
