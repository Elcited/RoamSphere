import { useEffect } from "react";

export default function useRenderTransitPolylines(
  parsedRoutes,
  map,
  AMap,
  polylineRef,
  shouldRender
) {
  useEffect(() => {
    if (!shouldRender || !map || !AMap || !parsedRoutes?.length) return;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    const allPolylines = [];

    parsedRoutes.forEach(route => {
      const segments = route.parsedRoutePolyline?.segments || [];
      segments.forEach(segment => {
        const coords = segment.path;
        if (!coords?.length) return;

        const path = coords.map(coord => new AMap.LngLat(coord[0], coord[1]));
        const polyline = new AMap.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: segment.color || "#1677FF",
          lineJoin: "round",
        });

        map.add(polyline);
        allPolylines.push(polyline);
      });
    });

    polylineRef.current = allPolylines;
    map.setFitView(allPolylines);
  }, [parsedRoutes, map, AMap, polylineRef, shouldRender]);
}
