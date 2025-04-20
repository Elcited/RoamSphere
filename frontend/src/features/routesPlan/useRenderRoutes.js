import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useAmapLoader from "./useAmapLoader";

export default function useRenderRoutes(mapInstance, isMapReady) {
  const { data: AMap } = useAmapLoader();
  const { selectedRoute, routes } = useSelector(store => store.routesPlan);
  const routeLineRef = useRef(null);

  useEffect(() => {
    if (!AMap || !isMapReady || !selectedRoute || !routes) return;

    const path = selectedRoute.steps.flatMap(step => [
      [step.start_location.lng, step.start_location.lat],
      [step.end_location.lng, step.end_location.lat],
    ]);

    console.log("路径数据：", path);

    if (!path.length) {
      console.error("路径为空，无法绘制");
      return;
    }

    routeLineRef.current = new AMap.Polyline({
      path,
      strokeColor: "#3366FF",
      strokeWeight: 5,
      lineJoin: "round",
    });

    mapInstance.add(routeLineRef.current);

    const middleIndex = Math.floor(path.length / 2);
    const middlePoint = path[middleIndex];
    if (middlePoint) {
      mapInstance.setCenter(middlePoint);
      mapInstance.setZoom(14);
    }
  }, [AMap, mapInstance, selectedRoute, isMapReady]);
}
