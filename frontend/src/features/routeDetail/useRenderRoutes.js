import { useRef } from "react";
import useGetRoutes from "../../features/routeDetail/useGetRoutes";
import getParserByTravelMode from "../../utils/getParserByTravelMode";
import useSyncRouteData from "./useSyncRouteData";
import useRenderTransitPolylines from "../transitRoute/useRenderTransitPolylines";
import useRenderSimplePolylines from "./useRenderSimplePolylines";

export default function useRenderRoutes(
  AMap,
  map,
  startLocation,
  endLocation,
  mapMode,
  travelMode
) {
  const polylineRef = useRef([]);

  const { data: routeData, isSuccess } = useGetRoutes(
    startLocation,
    endLocation,
    AMap,
    map,
    mapMode,
    travelMode
  );

  const shouldRender = isSuccess && mapMode === "route";

  const parsedRoutes = shouldRender
    ? getParserByTravelMode(travelMode)(routeData.routes)
    : [];

  useSyncRouteData(parsedRoutes, shouldRender, travelMode);

  if (["walking", "cycling", "driving"].includes(travelMode)) {
    const colorMap = {
      walking: "#EB2F96",
      cycling: "#FAAD14",
      driving: "#52C41A",
    };
    useRenderSimplePolylines(
      parsedRoutes,
      map,
      AMap,
      polylineRef,
      shouldRender,
      colorMap[travelMode]
    );
  } else if (travelMode === "transit") {
    useRenderTransitPolylines(
      parsedRoutes,
      map,
      AMap,
      polylineRef,
      shouldRender
    );
  }
}
