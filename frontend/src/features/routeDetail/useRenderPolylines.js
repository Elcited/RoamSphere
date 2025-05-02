import { useEffect } from "react";

export default function useRenderPolylines(
  parsedRoutes,
  map,
  AMap,
  polylineRef,
  shouldRender
) {
  useEffect(() => {
    if (!shouldRender || !AMap || !map || !parsedRoutes?.length) return;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach(p => map.remove(p));
      polylineRef.current = [];
    }

    const allPolylineInstances = [];

    const polylinesForRenderRoutes = parsedRoutes.map(
      route => route.parsedRoutePolyline.polylinesForRenderRoutes
    );

    polylinesForRenderRoutes.forEach(routePolylines => {
      const path = routePolylines.map(
        coord => new AMap.LngLat(coord[0], coord[1])
      );

      const polylineInstance = new AMap.Polyline({
        path,
        strokeWeight: 5,
        strokeColor: "blue",
        lineJoin: "round",
      });

      map.add(polylineInstance);
      allPolylineInstances.push(polylineInstance);
    });

    polylineRef.current = allPolylineInstances;
    map.setFitView(allPolylineInstances);
  }, [parsedRoutes, map, AMap, polylineRef, shouldRender]);
}
