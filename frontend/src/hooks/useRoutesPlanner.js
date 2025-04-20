import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGeocoder from "./useGeocoders";

export default function useRoutesPlanner(AMap, map) {
  // const { travelMode } = useSelector(store => store.routeDetail);
  const {
    startLocation,
    endLocation,
    isLoading: isGeoLoading,
  } = useGeocoder(AMap);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (!AMap || !map || !startLocation || !endLocation) return;

    const cacheKey = `${startLocation.lng},${startLocation.lat}-${endLocation.lng},${endLocation.lat}-${travelMode}`;

    // const { routes } = checkDB(cacheKey);
    const routes = true;

    if (!routes) {
      const path = routes.polyline;

      const polyline = new AMap.Polyline({
        path,
        strokeWeight: 2,
        strokeColor: "red",
        lineJoin: "round",
      });
      map.add(polyline);
    } else {
      AMap.plugin("AMap.Driving", () => {
        const driving = new AMap.Driving({
          policy: 11,
        });
        const startLngLat = [startLocation.lng, startLocation.lat];
        const endLngLat = [endLocation.lng, endLocation.lat];

        driving.search(startLngLat, endLngLat, (status, result) => {
          if (status === "complete" && result.routes.length) {
            console.log(result);
          }
        });
      });
    }

    // const checkDB = async () => {
    //   try {
    //     const res = await fetch(`/api/routes?key=${cacheKey}`);
    //     const data = await res.json();

    //     if (data?.polyline) {
    //       const path = AMap.PolylineTool.parse(data.polyline);
    //       const polyline = new AMap.Polyline({
    //         path,
    //         strokeColor: "blue",
    //         strokeWeight: 5,
    //       });
    //       map.add(polyline);
    //       setRouteData(data);
    //     } else {
    //       AMap.plugin("AMap.Driving", () => {
    //         const driving = new AMap.Driving({ map });
    //         driving.search([startLocation, endLocation], (status, result) => {
    //           if (status === "complete" && result.routes.length > 0) {
    //             const path = result.routes[0].path;
    //             const polyline = new AMap.Polyline({
    //               path,
    //               strokeColor: "blue",
    //               strokeWeight: 5,
    //             });
    //             map.add(polyline);

    //             fetch("localhost:3000/routes", {
    //               method: "POST",
    //               headers: { "Content-Type": "application/json" },
    //               body: JSON.stringify({
    //                 key: cacheKey,
    //                 polyline: path,
    //                 startLocation,
    //                 endLocation,
    //                 travelMode,
    //               }),
    //             });

    //             setRouteData({ path });
    //           } else {
    //             setError("路线查询失败");
    //           }
    //         });
    //       });
    //     }
    //   } catch (err) {
    //     setError("服务器出错");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // checkDB();
  }, [AMap, map, startLocation, endLocation, travelMode]);

  return { routeData, isLoading, error };
}
