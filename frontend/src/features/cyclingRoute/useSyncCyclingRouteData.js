import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setRoutesCities,
  setRoutesInfo,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesPolylines,
  setRoutesStepDistance,
  setRoutesOrientations,
  setRoutesWalkTypes,
} from "./cyclingRouteSlice";

export default function useSyncCyclingRouteData(parsedRoutes, shouldDispatch) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldDispatch || !parsedRoutes?.length) return;

    const routesInfo = [];
    const cities = [];
    const instructions = [];
    const polylines = [];
    const navigations = [];
    const orientations = [];
    const walkTypes = [];
    const stepDistances = [];

    parsedRoutes.forEach(route => {
      const polyline = route.parsedRoutePolyline;
      routesInfo.push(route.parsedRouteDetail);
      cities.push(polyline?.cities);
      instructions.push(polyline?.instructions);
      polylines.push(polyline?.polylinesForRenderDetails);
      navigations.push(polyline?.navigations);
      walkTypes.push(polyline?.walkTypes);
      orientations.push(polyline?.orientations);
      stepDistances.push(polyline?.stepDistance);
    });

    dispatch(setRoutesInfo(routesInfo));
    dispatch(setRoutesCities(cities));
    dispatch(setRoutesInstructions(instructions));
    dispatch(setRoutesPolylines(polylines));
    dispatch(setRoutesNavigations(navigations));
    dispatch(setRoutesWalkTypes(walkTypes));
    dispatch(setRoutesOrientations(orientations));
    dispatch(setRoutesStepDistance(stepDistances));
  }, [parsedRoutes, shouldDispatch, dispatch]);
}
