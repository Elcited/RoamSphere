import { useSelector } from "react-redux";
import getCommonRouteFields from "../utils/getCommonFields";

export default function useGetRouteInfo(travelMode) {
  const driving = useSelector(state => state.drivingRoute);
  const walking = useSelector(state => state.walkingRoute);
  const cycling = useSelector(state => state.cyclingRoute);
  const transit = useSelector(state => state.transitRoute);

  switch (travelMode) {
    case "driving":
      return {
        ...getCommonRouteFields(driving),
        routesRoadCities: driving.routesRoadCities ?? [],
        routesRoadStatus: driving.routesRoadStatus ?? [],
        routesRoadDistance: driving.routesRoadDistance ?? [],
        rawSlice: driving,
      };
    case "walking":
      return {
        ...getCommonRouteFields(walking),
        routesWalkTypes: walking.routesWalkTypes ?? [],
        routesStepDistance: walking.routesStepDistance ?? [],
        rawSlice: walking,
      };
    case "cycling":
      return {
        ...getCommonRouteFields(cycling),
        routesStepDistance: cycling.routesStepDistance ?? [],
        routesWalkTypes: cycling.routesWalkTypes ?? [],
        rawSlice: cycling,
      };
    case "transit":
      return {
        routesInfo: transit.routeList ?? [],
        selectedRoute: transit.selectedRoute,
        rawSlice: transit,
      };
    default:
      return {
        routesInfo: [],
        rawSlice: {},
      };
  }
}
