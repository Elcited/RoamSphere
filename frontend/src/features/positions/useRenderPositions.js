import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useGetPositions from "./useGetPositions";
import { setIsPositionRendered, setPositionsArray } from "./positionSlice";
import parsePositionsResult from "../../utils/parsePositionsResult";

export default function useRenderPositions(
  AMap,
  map,
  positionKeyWord,
  positionRegion,
  positionCoordinate,
  positionType,
  mapMode,
  isPositionRendered
) {
  const dispatch = useDispatch();
  const markersRef = useRef([]);

  const { data, isSuccess } = useGetPositions(
    positionKeyWord,
    positionRegion,
    mapMode === "position" ? positionCoordinate : null,
    positionType,
    AMap,
    map
  );

  useEffect(() => {
    if (mapMode !== "position" || !isSuccess || !AMap || !map) return;

    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
    }

    const parsed = parsePositionsResult(data.positions || []);
    const coords = parsed.map(r => r.location.coordinates);

    const newMarkers = coords.map((c, i) => {
      return new AMap.Marker({
        position: new AMap.LngLat(c[0], c[1]),
        offset: new AMap.Pixel(-10, -10),
        title: parsed[i].name,
      });
    });

    map.add(newMarkers);
    markersRef.current = newMarkers;

    // 平滑移动到第一个景点位置
    if (coords.length > 0) {
      const [lng, lat] = coords[0];
      map.panTo([lng, lat]); // 这里是平滑移动
    }

    dispatch(setPositionsArray(parsed));
  }, [AMap, map, mapMode, isSuccess, data, isPositionRendered, dispatch]);

  useEffect(() => {
    if (mapMode !== "position" && markersRef.current.length > 0 && map) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
      dispatch(setIsPositionRendered(false));
    }
  }, [mapMode, map, dispatch]);
}
