import formatDuration from "./formatDuration";
import formatDistance from "./formatDistance";

export default function parseDrivingRouteResult(routes) {
  console.log("parseDrivingRouteResult routes", routes);
  return routes.map(route => {
    const strategy = route.strategy;
    const polyline = route.polyline;
    const routeDetail = route.routeDetail;

    const polylinesForRenderRoutes =
      polyline?.polylines
        ?.flatMap(polyline => polyline.split(";"))
        ?.map(polyline => polyline.split(","))
        .map(p => p.map(p => Number(p))) || [];
    const polylinesForRenderDetails = polyline?.polylines || [];

    const instructions = polyline?.instructions || [];
    const cities = polyline?.cities?.flatMap(city => city) || [];
    const navigations = polyline?.navigations || [];
    const orientations = polyline?.orientations || [];
    const roadStatus = polyline?.roadStatus || [];
    const roadDistance = polyline?.roadDistance || 0;
    const roadCities = polyline?.roadCities || [];

    const startLocation = routeDetail?.start_location || {};
    const endLocation = routeDetail?.end_location || {};

    const distance = formatDistance(routeDetail?.distance);
    const duration = formatDuration(routeDetail?.duration);

    const taxi_costs = routeDetail?.taxi_costs || 0;
    const totalTolls = routeDetail?.totalTolls || 0;
    const trafficLights = routeDetail?.traffic_lights || 0;
    const travel_mode = routeDetail?.travel_mode || "unknown";

    const startInfo = routeDetail?.startInfo;

    const endInfo = routeDetail?.endInfo;

    const parsedRoutePolyline = {
      polylinesForRenderRoutes,
      polylinesForRenderDetails,
      instructions,
      cities,
      navigations,
      orientations,
      roadStatus,
      roadDistance,
      roadCities,
    };

    const parsedRouteDetail = {
      strategy,
      startLocation,
      endLocation,
      distance,
      duration,
      taxi_costs,
      totalTolls,
      trafficLights,
      travel_mode,
      startInfo,
      endInfo,
    };

    return { parsedRoutePolyline, parsedRouteDetail };
  });
}
