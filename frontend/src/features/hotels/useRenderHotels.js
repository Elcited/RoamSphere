import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useGetHotels from "../hotels/useGetHotels";
import { setHotelsArray, setIsHotelRendered } from "../hotels/hotelSlice";
import parseHotelsResult from "../../utils/pareseHotelsResult";

export default function useRenderHotels(
  AMap,
  map,
  hotelCoordinate,
  mapMode,
  isHotelRendered
) {
  const dispatch = useDispatch();
  const markersRef = useRef([]);

  const { data, isSuccess } = useGetHotels(
    mapMode === "hotel" ? hotelCoordinate : null,
    AMap,
    map,
    mapMode
  );

  // 渲染酒店 markers
  useEffect(() => {
    if (!AMap || !map || mapMode !== "hotel" || !isSuccess) return;
    console.log("zz");

    // 清除旧 markers（保险）
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
    }

    const parsed = parseHotelsResult(data.hotels || []);
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

    dispatch(setHotelsArray(parsed));
  }, [AMap, map, mapMode, isSuccess, data, isHotelRendered, dispatch]);

  // 切出 hotel 模式时清除 markers
  useEffect(() => {
    if (mapMode !== "hotel" && markersRef.current.length > 0 && map) {
      markersRef.current.forEach(marker => map.remove(marker));
      markersRef.current = [];
      dispatch(setIsHotelRendered(false));
    }
  }, [mapMode, map, dispatch]);
}
