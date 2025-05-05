import { useSelector } from "react-redux";

export default function useGetRouteInfo(travelMode) {
  const driving = useSelector(state => state.drivingRoute);
  const walking = useSelector(state => state.walkingRoute);
  const cycling = useSelector(state => state.cyclingRoute);
  const transit = useSelector(state => state.transitRoute);

  switch (travelMode) {
    case "driving":
      return {
        routesInfo: driving.routesInfo ?? [],
        routesPolylines: driving.routesPolylines ?? [],
        routesInstructions: driving.routesInstructions ?? [],
        routesRoadDistance: driving.routesRoadDistance ?? [],
        rawSlice: driving,
      };
    case "walking":
      return {
        routesInfo: walking.routesInfo ?? [],
        routesPolylines: walking.routesPolylines ?? [],
        routesInstructions: walking.routesInstructions ?? [],
        routesWalkTypes: walking.routesWalkTypes ?? [],
        rawSlice: walking,
      };
    case "cycling":
      return {
        routesInfo: cycling.routesInfo ?? [],
        routesPolylines: cycling.routesPolylines ?? [],
        routesInstructions: cycling.routesInstructions ?? [],
        routesStepDistance: cycling.routesStepDistance ?? [],
        rawSlice: cycling,
      };
    case "transit":
      return {
        routesInfo: transit.routeList ?? [],
        selectedIndex: transit.selectedIndex,
        rawSlice: transit,
      };
    default:
      return {
        routesInfo: [],
        rawSlice: {},
      };
  }
}
