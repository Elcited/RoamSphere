import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/authentication/userSlice";
import mapReducer from "../features/map/mapSlice";
import routesDrawerReducer from "../features/routesDrawer/routesDrawerSlice";
import routeReducer from "../features/routeDetail/routeSlice";
import drivingRouteReducer from "../features/drivingRoute/drivingRouteSlice";
import transitRouteReducer from "../features/transitRoute/transitRouteSlice";
import walkingRouteReducer from "../features/walkingRoute/walkingRouteSlice";
import cyclingRouteReducer from "../features/cyclingRoute/cyclingRouteSlice";
import attractionReducer from "../features/attractions/attractionSlice";
import hotelReducer from "../features/hotels/hotelSlice";
import positionReducer from "../features/positions/positionSlice";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    routesDrawer: routesDrawerReducer,
    route: routeReducer,
    drivingRoute: drivingRouteReducer,
    transitRoute: transitRouteReducer,
    walkingRoute: walkingRouteReducer,
    cyclingRoute: cyclingRouteReducer,
    attraction: attractionReducer,
    hotel: hotelReducer,
    position: positionReducer,
    search: searchReducer,
  },
});

export default store;
