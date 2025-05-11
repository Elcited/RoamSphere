import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setRoutesCities,
  setRoutesInfo,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesPolylines,
  setRoutesWalkTypes,
  setRoutesOrientations,
  setRoutesStepDistance,
} from "./walkingRouteSlice";

export default function useSyncWalkingRouteData(parsedRoutes, shouldDispatch) {
  const dispatch = useDispatch();
  console.log("useSyncWalkingRouteData", parsedRoutes);
  console.log("useSyncWalkingRouteData shouldDispatch", shouldDispatch);

  useEffect(() => {
    if (!shouldDispatch || !parsedRoutes?.length) return;

    const routesInfo = [];
    const cities = [];
    const instructions = [];
    const polylines = [];
    const navigations = [];
    const orientations = [];
    const stepDistances = [];
    const walkTypes = [];

    parsedRoutes.forEach(route => {
      const polyline = route.parsedRoutePolyline;
      routesInfo.push(route.parsedRouteDetail);
      cities.push(polyline?.cities);
      instructions.push(polyline?.instructions);
      polylines.push(polyline?.polylinesForRenderDetails);
      navigations.push(polyline?.navigations);
      orientations.push(polyline?.orientations);
      stepDistances.push(polyline?.stepDistance);
      walkTypes.push(polyline?.walkTypes);
    });

    dispatch(setRoutesInfo(routesInfo));
    dispatch(setRoutesCities(cities));
    dispatch(setRoutesInstructions(instructions));
    dispatch(setRoutesPolylines(polylines));
    dispatch(setRoutesNavigations(navigations));
    dispatch(setRoutesStepDistance(stepDistances));
    dispatch(setRoutesOrientations(orientations));
    dispatch(setRoutesWalkTypes(walkTypes));
  }, [parsedRoutes, shouldDispatch, dispatch]);
}
