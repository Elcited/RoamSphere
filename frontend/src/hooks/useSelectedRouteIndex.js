import { useSelector } from "react-redux";

export default function useSelectedRouteIndex(travelMode) {
  return useSelector(state => {
    switch (travelMode) {
      case "driving":
        return state.drivingRoute.selectedRoute;
      case "cycling":
        return state.cyclingRoute.selectedRoute;
      case "walking":
        return state.walkingRoute.selectedRoute;
      case "transit":
        return state.transitRoute.selectedRoute;
      default:
        return 0;
    }
  });
}
