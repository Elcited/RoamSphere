import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetRoutes from "../../features/routeDetail/useGetRoutes";
import useGetAttractions from "../attractions/useGetAttractions";
import useGetHotels from "../hotels/useGetHotels";
import { setInfo, setPolyline } from "../routeDetail/routeDetailSlice";
import { setAttractionsArray } from "../attractions/attractionSlice";
import parseRouteResult from "../../utils/parseRouteResult";
import parseAttractionsResult from "../../utils/parseAttractionsResult";
import parseHotelsResult from "../../utils/pareseHotelsResult";
import useGetPositions from "../positions/useGetPositions";

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
  const { strategy } = useSelector(store => store.routeDetail);

  const {
    data: routeData,
    isSuccess: isGetRoutesSuccess,
    isLoading: isGetRoutesLoading,
  } = useGetRoutes(startLocation, endLocation, AMap, map, mapMode);

  const {
    data: attractionData,
    isSuccess: isGetAttractionsSuccess,
    isLoading: isGetAttractionsLoading,
  } = useGetAttractions(attractionCoordinate, AMap, map, mapMode);
  console.log(attractionData);

  const {
    data: hotelData,
    isSuccess: isGetHotelsSuccess,
    isLoading: isGetHotelsLoading,
  } = useGetHotels(hotelCoordinate, AMap, map, mapMode);
  console.log(hotelData);

  const {
    data: positionData,
    isSuccess: isGetPositionSuccess,
    isLoading: isGetPositionLoading,
  } = useGetPositions(
    positionKeyWord,
    positionRegion,
    positionCoordinate,
    positionType,
    AMap,
    map
  );
  console.log("position服务：", positionData);

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
      const basePolyline = new AMap.Polyline({
        path,
        strokeWeight: 5,
        strokeColor: "green",
        lineJoin: "round",
      });

      map.add(basePolyline);
      polylineRef.current = basePolyline;

      map.setFitView([basePolyline]);
    }

    if (mapMode === "hotel" && isGetHotelsSuccess) {
      const { source, hotels: hotelsList } = hotelData;
      const parsedHotelResult = parseHotelsResult(hotelsList);
      console.log(parsedHotelResult);
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
      console.log(markers);
      map.add(markers);
      dispatch(setAttractionsArray(parsedHotelResult));
    }

    if (mapMode === "attraction" && isGetAttractionsSuccess) {
      const { source, attractions: attractionsList } = attractionData;
      const parsedAttractionResult = parseAttractionsResult(attractionsList);
      console.log(parsedAttractionResult);
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
      dispatch(setAttractionsArray(parsedAttractionResult));
    }

    if (mapMode === "position" && isGetPositionSuccess) {
      // const { source, positions: positionsList } = attractionData;
      // const parsedPositionResult = parseAttractionsResult(positionsList);
      // console.log(parsedPositionResult);
      // const positionsCoordinates = parsedPositionResult.map(
      //   r => r.location.coordinates
      // );
      // const markers = positionsCoordinates.map(
      //   (c, index) =>
      //     new AMap.Marker({
      //       position: new AMap.LngLat(c[0], c[1]),
      //       offset: new AMap.Pixel(-10, -10),
      //       title: parsedPositionResult[index].name,
      //     })
      // );
      // map.add(markers);
      // dispatch(setAttractionsArray(parsedPositionResult));
    }

    if (mapMode === "custom") return null;
  }, [
    AMap,
    map,
    mapMode,
    isGetRoutesSuccess,
    isGetAttractionsSuccess,
    isGetHotelsSuccess,
    isGetPositionSuccess,
    strategy,
    startLocation,
    endLocation,
  ]);
}
