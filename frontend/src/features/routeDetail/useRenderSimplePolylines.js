import { useEffect } from "react";

export default function useRenderSimplePolylines(
  parsedRoutes,
  selectedRouteIndex,
  map,
  AMap,
  polylineRef,
  shouldRender,
  strokeColor = "#52C41A",
  strokeWeight = 5
) {
  useEffect(() => {
    if (!shouldRender || !map || !AMap || !parsedRoutes?.length) return;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    console.log(`simple parsedRoutes`, parsedRoutes);
    const newPolylines = parsedRoutes
      .map((route, index) => {
        const coords = route.parsedRoutePolyline.polylinesForRenderRoutes;
        if (!coords?.length) return null;

        const isSelected = index === selectedRouteIndex;

        const path = coords.map(coord => new AMap.LngLat(coord[0], coord[1]));
        const polyline = new AMap.Polyline({
          path,
          strokeColor: isSelected ? strokeColor : "#999",
          strokeWeight,
          lineJoin: "round",
        });

        map.add(polyline);
        return polyline;
      })
      .filter(Boolean);

    polylineRef.current = newPolylines;
    map.setFitView(newPolylines);
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
