import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsRouteRendered } from "../routeDetail/routeSlice";

export default function useRouteMapSync(AMap, map) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { polyline, isRouteRendered } = useSelector(store => store.routeDetail);
  const polylineInstanceRef = useRef([]);

  useEffect(() => {
    if (!AMap || !map) return;

    if (pathname.startsWith("/map/routes")) {
      if (
        isRouteRendered &&
        Array.isArray(polyline) &&
        polylineInstanceRef.current.length === 0
      ) {
        const allPolylines = [];

        polyline.forEach(routePolyline => {
          routePolyline.polylinesForRenderRoutes.forEach(p => {
            const path = p.map(coord => new AMap.LngLat(coord[0], coord[1]));
            const polylineInstance = new AMap.Polyline({
              path,
              strokeWeight: 5,
              strokeColor: "green",
              lineJoin: "round",
            });
            map.add(polylineInstance);
            allPolylines.push(polylineInstance);
          });
        });

        polylineInstanceRef.current = allPolylines;
        map.setFitView(allPolylines);
      }
    } else {
      if (polylineInstanceRef.current.length > 0) {
        polylineInstanceRef.current.forEach(p => map.remove(p));
        polylineInstanceRef.current = [];
        dispatch(setIsRouteRendered(false));
      }
    }
  }, [AMap, map, pathname, isRouteRendered, polyline, dispatch]);
}
