import { useEffect } from "react";
import parseTransitPolylines from "../../utils/parseTransitPolylines";

export default function useRenderTransitPolylines(
  parsedRoutes,
  selectedRouteIndex,
  map,
  AMap,
  polylineRef,
  shouldRender,
  strokeColor = "#1677FF",
  strokeWeight = 5
) {
  const colorsByType = {
    walking: "#73d13d",
    bus: "#1677FF",
    subway: "#722ed1",
    cityRailway: "#172090",
    taxi: "#247755",
  };

  useEffect(() => {
    // 提前返回逻辑，不要让 useEffect 逻辑炸
    if (
      !Array.isArray(parsedRoutes) ||
      !parsedRoutes.length ||
      !shouldRender ||
      !map ||
      !AMap
    )
      return;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    const allPolylines = parsedRoutes.map(route => route.polylines);
    const parsedPolylines = parseTransitPolylines(allPolylines);

    parsedPolylines.forEach(strategyGroup => {
      strategyGroup.forEach((route, index) => {
        const isSelected = index === selectedRouteIndex;

        route.segments.forEach(segment => {
          segment.forEach(s => {
            const color = colorsByType[s.type] || strokeColor;
            const path = s.polylines.map(p => new AMap.LngLat(p.lng, p.lat));

            const polyline = new AMap.Polyline({
              path,
              strokeColor: isSelected ? color : "#ccc",
              strokeWeight: isSelected ? strokeWeight : 3,
              strokeOpacity: isSelected ? 1 : 0.5,
              zIndex: isSelected ? 80 : 10,
              lineJoin: "round",
            });

            map.add(polyline);
            polylineRef.current.push(polyline);
          });
        });
      });
    });
  }, [
    Array.isArray(parsedRoutes) ? parsedRoutes : [], // 保证永远是数组
    selectedRouteIndex,
    map,
    AMap,
    shouldRender,
    strokeColor,
    strokeWeight,
  ]);
}
