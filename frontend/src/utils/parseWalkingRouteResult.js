import formatDuration from "./formatDuration";
import formatDistance from "./formatDistance";

export default function parseWalkingRouteResult(routes) {
  console.log("parseWalkingRouteResult", routes);
  return routes.map(route => {
    const strategy = route.strategy;
    const polyline = route.polyline;
    const routeDetail = route.routeDetail;

    console.log(polyline);
    console.log(routeDetail);

    const startLocation = routeDetail?.start_location || {};
    const endLocation = routeDetail?.end_location || {};
    const startInfo = routeDetail?.startInfo;
    const endInfo = routeDetail?.endInfo;
    const duration = formatDuration(routeDetail?.duration) || "";
    const distance = formatDistance(routeDetail?.distance) || "";
    const travelMode = routeDetail?.travel_mode;

    const polylinesForRenderRoutes =
      polyline?.polylines
        ?.flatMap(polyline => polyline.split(";"))
        ?.map(polyline => polyline.split(","))
        .map(p => p.map(p => Number(p))) || [];
    const polylinesForRenderDetails = polyline?.polylines || [];
    const instructions = polyline?.instructions || [];
    const navigations = polyline?.navigations || [];
    const orientations = polyline?.orientations || [];
    const walkTypes = polyline?.walkTypes || [];
    const stepDistance = polyline?.step_distance || [];

    const parsedRoutePolyline = {
      polylinesForRenderRoutes,
      polylinesForRenderDetails,
      instructions,
      navigations,
      stepDistance,
      orientations,
      walkTypes,
    };

    const parsedRouteDetail = {
      strategy,
      startLocation,
      endLocation,
      startInfo,
      endInfo,
      duration,
      distance,
      travelMode,
    };

    return { parsedRoutePolyline, parsedRouteDetail };
  });
}
