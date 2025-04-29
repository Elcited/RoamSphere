import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsRouteRendered } from "../routeDetail/routeDetailSlice";

export default function useRouteMapSync(AMap, map) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { polyline, isRouteRendered } = useSelector(store => store.routeDetail);
  const polylineInstanceRef = useRef(null);

  useEffect(() => {
    if (!AMap || !map) return;

    if (pathname.startsWith("/map/routes")) {
      if (isRouteRendered && polyline && !polylineInstanceRef.current) {
        const path = polyline.polylinesForRenderRoutes.map(
          p => new AMap.LngLat(p[0], p[1])
        );
        const newPolyline = new AMap.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: "green",
          lineJoin: "round",
        });
        map.add(newPolyline);
        polylineInstanceRef.current = newPolyline;
        map.setFitView([newPolyline]);
      }
    } else {
      if (polylineInstanceRef.current) {
        map.remove(polylineInstanceRef.current);
        polylineInstanceRef.current = null;
        dispatch(setIsRouteRendered(true));
      }
    }
  }, [AMap, map, pathname, isRouteRendered, polyline, dispatch]);
}
