import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetRoutes from "../../features/routeDetail/useGetRoutes";
import { setInfo, setPolyline } from "../routeDetail/routeDetailSlice";
import parseRouteResult from "../../utils/parseRouteResult";
import useGetAttractions from "../attractions/useGetAttractions";
import parseAttractionsResult from "../../utils/parseAttractionsResult";
import { setAttractionsArray } from "../attractions/attractionSlice";

export default function useMapModePlugin(
  AMap,
  map,
  mapMode,
  startLocation,
  endLocation
) {
  const polylineRef = useRef(null);

  const dispatch = useDispatch();
  const { strategy } = useSelector(store => store.routeDetail);
  const {
    data: routeData,
    isSuccess: isGetRoutesSuccess,
    isLoading: isGetRoutesLoading,
  } = useGetRoutes(startLocation, endLocation, AMap, map);

  const {
    data: attractionData,
    isSuccess: isGetAttractionsSuccess,
    isLoading,
  } = useGetAttractions(endLocation, AMap, map);

  useEffect(() => {
    if (!AMap && !map) return;

    if (mapMode === "route" && isGetRoutesSuccess) {
      const { parsedRoutePolyline, parsedRouteDetail } =
        parseRouteResult(routeData);

      dispatch(setInfo(parsedRouteDetail));
      dispatch(setPolyline(parsedRoutePolyline));

      if (polylineRef.current) {
        map.remove(polylineRef.current);
        polylineRef.current = null;
      }

      const path = parsedRoutePolyline.polylinesForRenderRoutes.map(
        p => new AMap.LngLat(p[0], p[1])
      );
      const newPolyline = new AMap.Polyline({
        path,
        strokeWeight: 5,
        strokeColor: "green",
        lineJoin: "round",
      });

      map.add(newPolyline);
      polylineRef.current = newPolyline;

      map.setFitView([newPolyline]);
    }

    if (mapMode === "hotel") return null;

    if (mapMode === "attractions" && isGetAttractionsSuccess) {
      const { source, attractions: attractionsList } = attractionData;
      const parsedAttractionResult = parseAttractionsResult(attractionsList);
      dispatch(setAttractionsArray(parsedAttractionResult));
    }

    if (mapMode === "custom") return null;
  }, [
    AMap,
    map,
    mapMode,
    isGetRoutesSuccess,
    isGetAttractionsSuccess,
    strategy,
    startLocation,
    endLocation,
  ]);
}
