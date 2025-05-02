import { useEffect } from "react";

export default function useRenderSimplePolylines(
  parsedRoutes,
  map,
  AMap,
  polylineRef,
  shouldRender,
  strokeColor = "#1677FF",
  strokeWeight = 5
) {
  useEffect(() => {
    if (!shouldRender || !map || !AMap || !parsedRoutes?.length) return;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    const allPolylines = [];

    parsedRoutes.forEach(route => {
      const coords = route.parsedRoutePolyline?.polylinesForRenderRoutes;
      if (!coords?.length) return;

      const path = coords.map(coord => new AMap.LngLat(coord[0], coord[1]));
      const polyline = new AMap.Polyline({
        path,
        strokeWeight,
        strokeColor,
        lineJoin: "round",
      });

      map.add(polyline);
      allPolylines.push(polyline);
    });

    polylineRef.current = allPolylines;
    map.setFitView(allPolylines);
  }, [
    parsedRoutes,
    map,
    AMap,
    polylineRef,
    shouldRender,
    strokeColor,
    strokeWeight,
  ]);
}
