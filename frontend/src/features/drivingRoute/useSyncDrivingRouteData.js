import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setRoutesInfo,
  setRoutesPolylines,
  setRoutesCities,
  setRoutesInstructions,
  setRoutesNavigations,
  setRoutesOrientations,
  setRoutesRoadCities,
  setRoutesRoadDistance,
  setRoutesRoadStatus,
} from "./drivingRouteSlice";

export default function useSyncDrivingRouteData(drivingRoutes, shouldDispatch) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldDispatch || !drivingRoutes?.length) return;

    const allRouteInfo = [];
    const allPolyline = [];
    drivingRoutes.forEach(route => {
      allRouteInfo.push(route.parsedRouteDetail);
      allPolyline.push(route.parsedRoutePolyline);
    });

    const allRoutesCities = [];
    const allRoutesInstructions = [];
    const allRoutesPolylines = [];
    const allRoutesNavigations = [];
    const allRoutesOrientations = [];
    const allRoutesRoadCities = [];
    const allRoutesRoadDistance = [];
    const allRoutesRoadStatus = [];

    allPolyline.forEach(polyline => {
      allRoutesCities.push(polyline?.cities);
      allRoutesInstructions.push(polyline?.instructions);
      allRoutesPolylines.push(polyline?.polylinesForRenderDetails);
      allRoutesNavigations.push(polyline?.navigations);
      allRoutesOrientations.push(polyline?.orientations);
      allRoutesRoadCities.push(polyline?.roadCities);
      allRoutesRoadDistance.push(polyline?.roadDistance);
      allRoutesRoadStatus.push(polyline?.roadStatus);
    });

    dispatch(setRoutesInfo(allRouteInfo));
    dispatch(setRoutesCities(allRoutesCities));
    dispatch(setRoutesInstructions(allRoutesInstructions));
    dispatch(setRoutesPolylines(allRoutesPolylines));
    dispatch(setRoutesNavigations(allRoutesNavigations));
    dispatch(setRoutesOrientations(allRoutesOrientations));
    dispatch(setRoutesRoadCities(allRoutesRoadCities));
    dispatch(setRoutesRoadDistance(allRoutesRoadDistance));
    dispatch(setRoutesRoadStatus(allRoutesRoadStatus));
  }, [drivingRoutes, shouldDispatch, dispatch]);
}
