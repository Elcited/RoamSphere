import useSyncTransitRouteData from "../transitRoute/useSyncTransitRouteData";
import useSyncDrivingRouteData from "../drivingRoute/useSyncDrivingRouteData";
import useSyncCyclingRouteData from "../cyclingRoute/useSyncCyclingRouteData";
import useSyncWalkingRouteData from "../walkingRoute/useSyncWalkingRouteData";

export default function useSyncRouteData(
  parsedRoutes,
  shouldDispatch,
  travelMode
) {
  useSyncTransitRouteData(
    parsedRoutes,
    shouldDispatch && travelMode === "transit"
  );
  useSyncDrivingRouteData(
    parsedRoutes,
    shouldDispatch && travelMode === "driving"
  );
  useSyncCyclingRouteData(
    parsedRoutes,
    shouldDispatch && travelMode === "cycling"
  );
  useSyncWalkingRouteData(
    parsedRoutes,
    shouldDispatch && travelMode === "walking"
  );
}
