import { useEffect } from "react";

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
  useEffect(() => {
    if (!shouldRender || !map || !AMap || !parsedRoutes?.length) return;
    console.log("Transit parsedPolylines", parsedRoutes);

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    const allPolylines = [];

    parsedRoutes.forEach((route, index) => {
      const segments = route.parsedRoutePolylines?.segments || [];
      segments.forEach(segment => {
        const coords = segment.path;
        if (!coords?.length) return;

        const isSelected = index === selectedRouteIndex;

        const path = coords.map(coord => new AMap.LngLat(coord[0], coord[1]));
        const polyline = new AMap.Polyline({
          path,
          strokeColor: segment.color || strokeColor,
          strokeWeight,
          lineJoin: "round",
        });

        map.add(polyline);
        allPolylines.push(polyline);
      });
    });

    polylineRef.current = allPolylines;
    map.setFitView(allPolylines);
  }, [
    parsedRoutes,
    selectedRouteIndex,
    map,
    AMap,
    polylineRef,
    shouldRender,
    strokeColor,
    strokeWeight,
  ]);
}
