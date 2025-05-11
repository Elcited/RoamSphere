import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoutesInfo } from "../transitRoute/transitRouteSlice";

export default function useSyncTransitRouteData(parsedRoutes, shouldRender) {
  const dispatch = useDispatch();

  console.log("useSyncTransitRouteData", parsedRoutes);
  console.log("useSyncTransitRouteData shouldDispatch", shouldRender);

  useEffect(() => {
    if (!shouldRender || !parsedRoutes?.length) return;

    const parsedRouteDetails = parsedRoutes.map(r => r.routeInfo);

    dispatch(setRoutesInfo(parsedRouteDetails));
  }, [parsedRoutes, shouldRender]);
}
