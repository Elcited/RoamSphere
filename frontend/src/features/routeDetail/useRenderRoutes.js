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
  console.log(routeData);

  useEffect(() => {
    dispatch(setIsRoutesLoading(isLoading));
    dispatch(setIsRoutesSuccess(!isLoading && isSuccess));
  }, [dispatch, isLoading, isSuccess]);

  const shouldRender = isSuccess && mapMode === "route";

  const parsedRoutes = shouldRender
    ? getParserByTravelMode(travelMode)(routeData.routes)
    : [];

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

  if (["walking", "cycling", "driving"].includes(travelMode)) {
    useRenderSimplePolylines(
      parsedRoutes,
      selectedRouteIndex,
      map,
      AMap,
      polylineRef,
      shouldRender,
      colorMap[travelMode],
      weightMap[travelMode]
    );
  } else if (travelMode === "transit") {
    useRenderTransitPolylines(
      parsedRoutes,
      selectedRouteIndex,
      map,
      AMap,
      polylineRef,
      shouldRender,
      colorMap[travelMode],
      weightMap[travelMode]
    );
  }
}
