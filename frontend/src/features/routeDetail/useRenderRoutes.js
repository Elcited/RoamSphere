import { useEffect, useId, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setInfo,
  setIsRouteRendered,
  setPolyline,
} from "../routeDetail/routeDetailSlice";
import parseDrivingRouteResult from "../../utils/parseDrivingRouteResult";

export default function useRenderRoute(
  AMap,
  map,
  mapMode,
  routeData,
  isGetRoutesSuccess
) {
  const dispatch = useDispatch();
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!AMap || !map || mapMode !== "route" || !isGetRoutesSuccess) return;
    console.log("useRenderRoute执行");
    const { parsedRoutePolyline, parsedRouteDetail } =
      parseDrivingRouteResult(routeData);

    dispatch(setInfo(parsedRouteDetail));
    dispatch(setPolyline(parsedRoutePolyline));

    if (polylineRef.current) {
      map.remove(polylineRef.current);
      polylineRef.current = null;
    }

    const path = parsedRoutePolyline.polylinesForRenderRoutes.map(
      p => new AMap.LngLat(p[0], p[1])
    );
    const basePolyline = new AMap.Polyline({
      path,
      strokeWeight: 5,
      strokeColor: "green",
      lineJoin: "round",
    });

    map.add(basePolyline);
    dispatch(setIsRouteRendered(true));
    polylineRef.current = basePolyline;
    map.setFitView([basePolyline]);

    // return () => {
    //   if (polylineRef.current) {
    //     map.remove(polylineRef.current);
    //   }
    // };
  }, [AMap, map, mapMode, isGetRoutesSuccess, routeData, dispatch]);

  return polylineRef;
}
