import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetRoutes from "../../features/routeDetail/useGetRoutes";
import useGetAttractions from "../attractions/useGetAttractions";
import useGetHotels from "../hotels/useGetHotels";
import {
  setInfo,
  setIsRouteRendered,
  setPolyline,
} from "../routeDetail/routeDetailSlice";
import {
  setAttractionsArray,
  setIsAttractionRendered,
} from "../attractions/attractionSlice";
import parseDrivingRouteResult from "../../utils/parseDrivingRouteResult";
import parseAttractionsResult from "../../utils/parseAttractionsResult";
import parseHotelsResult from "../../utils/pareseHotelsResult";
import useGetPositions from "../positions/useGetPositions";
import { setHotelsArray, setIsHotelRendered } from "../hotels/hotelSlice";
import {
  setIsPositionRendered,
  setPositionsArray,
} from "../positions/positionSlice";

export default function useMapModePlugin(
  AMap,
  map,
  mapMode,
  startLocation,
  endLocation,
  attractionCoordinate,
  hotelCoordinate,
  positionKeyWord,
  positionRegion,
  positionCoordinate,
  positionType
) {
  const polylineRef = useRef(null);

  const dispatch = useDispatch();
  const { strategy, travelMode } = useSelector(store => store.routeDetail);

  const {
    data: routeData,
    isSuccess: isGetRoutesSuccess,
    isLoading: isGetRoutesLoading,
  } = useGetRoutes(startLocation, endLocation, AMap, map, mapMode, travelMode);
  console.log(routeData);

  const {
    data: attractionData,
    isSuccess: isGetAttractionsSuccess,
    isLoading: isGetAttractionsLoading,
  } = useGetAttractions(
    mapMode === "attraction" ? attractionCoordinate : null,
    AMap,
    map,
    mapMode
  );

  const {
    data: hotelData,
    isSuccess: isGetHotelsSuccess,
    isLoading: isGetHotelsLoading,
  } = useGetHotels(
    mapMode === "hotel" ? hotelCoordinate : null,
    AMap,
    map,
    mapMode
  );

  const {
    data: positionData,
    isSuccess: isGetPositionsSuccess,
    isLoading: isGetPositionLoading,
  } = useGetPositions(
    positionKeyWord,
    positionRegion,
    mapMode === "position" ? positionCoordinate : null,
    positionType,
    AMap,
    map
  );

  useEffect(() => {
    if (!AMap && !map) return;

    if (mapMode === "route" && isGetRoutesSuccess) {
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
    }

    if (mapMode === "hotel" && isGetHotelsSuccess) {
      const { source, hotels: hotelsList } = hotelData;
      const parsedHotelResult = parseHotelsResult(hotelsList);
      const hotelsCoordinates = parsedHotelResult.map(
        r => r.location.coordinates
      );
      const markers = hotelsCoordinates.map(
        (c, index) =>
          new AMap.Marker({
            position: new AMap.LngLat(c[0], c[1]),
            offset: new AMap.Pixel(-10, -10),
            title: parsedHotelResult[index].name,
          })
      );
      map.add(markers);
      dispatch(setIsHotelRendered(false));
      dispatch(setHotelsArray(parsedHotelResult));
    }

    if (mapMode === "attraction" && isGetAttractionsSuccess) {
      const { source, attractions: attractionsList } = attractionData;
      const parsedAttractionResult = parseAttractionsResult(attractionsList);
      const attractionsCoordinates = parsedAttractionResult.map(
        r => r.location.coordinates
      );
      const markers = attractionsCoordinates.map(
        (c, index) =>
          new AMap.Marker({
            position: new AMap.LngLat(c[0], c[1]),
            offset: new AMap.Pixel(-10, -10),
            title: parsedAttractionResult[index].name,
          })
      );
      map.add(markers);
      dispatch(setIsAttractionRendered(true));
      dispatch(setAttractionsArray(parsedAttractionResult));
    }

    if (mapMode === "position" && isGetPositionsSuccess) {
      const { source, positions: positionsList } = positionData;
      const parsedPositionResult = parseAttractionsResult(positionsList);
      const positionsCoordinates = parsedPositionResult.map(
        r => r.location.coordinates
      );
      const markers = positionsCoordinates.map(
        (c, index) =>
          new AMap.Marker({
            position: new AMap.LngLat(c[0], c[1]),
            offset: new AMap.Pixel(-10, -10),
            title: parsedPositionResult[index].name,
          })
      );
      map.add(markers);
      dispatch(setIsPositionRendered(true));
      dispatch(setPositionsArray(parsedPositionResult));
    }

    if (mapMode === "custom") return null;
  }, [
    AMap,
    map,
    mapMode,
    isGetRoutesSuccess,
    isGetAttractionsSuccess,
    isGetHotelsSuccess,
    isGetPositionsSuccess,
    strategy,
    travelMode,
    positionType,
    startLocation,
    endLocation,
  ]);
}
