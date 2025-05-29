import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useGetAttractions from "../attractions/useGetAttractions";
import {
  setAttractionsArray,
  setIsAttractionRendered,
} from "../attractions/attractionSlice";
import parseAttractionsResult from "../../utils/parseAttractionsResult";

export default function useRenderAttractions(
  AMap,
  map,
  attractionCoordinate,
  mapMode,
  isAttractionRendered
) {
  const dispatch = useDispatch();
  const markersRef = useRef([]);

  const { data, isSuccess } = useGetAttractions(
    mapMode === "attraction" ? attractionCoordinate : null,
    AMap,
    map,
    mapMode
  );

  // 渲染景点
  useEffect(() => {
    if (mapMode !== "attraction" || !isSuccess || !AMap || !map) return;

    // 清除旧的 markers（双重保障）
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
    }

    const parsed = parseAttractionsResult(data.attractions || []);
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

    dispatch(setAttractionsArray(parsed));
  }, [AMap, map, mapMode, isSuccess, data, isAttractionRendered, dispatch]);

  // 切出 attraction 模式时清除 markers
  useEffect(() => {
    if (mapMode !== "attraction" && markersRef.current.length > 0 && map) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
      dispatch(setIsAttractionRendered(false));
    }
  }, [mapMode, map, dispatch]);
}
