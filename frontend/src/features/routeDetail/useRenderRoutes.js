import { useEffect, useRef } from "react";
import useGetRoutes from "../../features/routeDetail/useGetRoutes";
import { useDispatch } from "react-redux";
import { setIsRoutesLoading, setIsRoutesSuccess } from "./routeSlice";
import getParserByTravelMode from "../../utils/getParserByTravelMode";
import useSyncRouteData from "./useSyncRouteData";
import useRenderTransitPolylines from "../transitRoute/useRenderTransitPolylines";
import useRenderSimplePolylines from "./useRenderSimplePolylines";
import useSelectedRouteIndex from "../../hooks/useSelectedRouteIndex";

export default function useRenderRoutes(
  AMap,
  map,
  startLocation,
  endLocation,
  mapMode,
  travelMode
) {
  const polylineRef = useRef([]);
  const dispatch = useDispatch();

  const {
    data: routeData,
    isSuccess,
    isLoading,
  } = useGetRoutes(startLocation, endLocation, AMap, map, mapMode, travelMode);

  useEffect(() => {
    dispatch(setIsRoutesLoading(isLoading));
    dispatch(setIsRoutesSuccess(!isLoading && isSuccess));
  }, [dispatch, isLoading, isSuccess]);

  const shouldRender = isSuccess && mapMode === "route";

  const parsedRoutes = shouldRender
    ? getParserByTravelMode(travelMode)(routeData.routes)
    : [];

  const normalizedRoutes = Array.isArray(parsedRoutes) ? parsedRoutes : [];

  const selectedRouteIndex = useSelectedRouteIndex(travelMode);

  useSyncRouteData(parsedRoutes, shouldRender, travelMode);

  const colorMap = {
    walking: "#52C41A",
    cycling: "#FA8C16",
    driving: "#1677FF",
    transit: "#722ED1",
  };

  const weightMap = {
    walking: 5,
    cycling: 5,
    driving: 5,
    transit: 5,
  };

  useRenderSimplePolylines(
    normalizedRoutes,
    selectedRouteIndex,
    map,
    AMap,
    polylineRef,
    shouldRender && ["walking", "cycling", "driving"].includes(travelMode),
    colorMap[travelMode],
    weightMap[travelMode]
  );

  useRenderTransitPolylines(
    normalizedRoutes,
    selectedRouteIndex,
    map,
    AMap,
    polylineRef,
    shouldRender && travelMode === "transit",
    colorMap[travelMode],
    weightMap[travelMode]
  );

  useEffect(() => {
    if (!shouldRender && polylineRef.current.length > 0 && map) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }
  }, [shouldRender, map]);
}
