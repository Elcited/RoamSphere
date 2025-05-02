export default function parseDrivingRouteResult(routes) {
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

    const distance = routeDetail?.distance || 0;
    const distanceInKm = (distance / 1000).toFixed(2);

    const duration = routeDetail?.duration || 0;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const formattedTime = `${hours.toString().padStart(2, "0")}小时 ${minutes
      .toString()
      .padStart(2, "0")}分钟 ${seconds.toString().padStart(2, "0")}秒`;

    const taxi_costs = routeDetail?.taxi_costs || 0;
    const totalTolls = routeDetail?.totalTolls || 0;
    const trafficLights = routeDetail?.traffic_lights || 0;
    const travel_mode = routeDetail?.travel_mode || "unknown";

    const startInfo = {
      country:
        routeDetail?.startInfo?.regeocode?.addressComponent?.country || "",
      province:
        routeDetail?.startInfo?.regeocode?.addressComponent?.province || "",
      city: routeDetail?.startInfo?.regeocode?.addressComponent?.city || "",
      district:
        routeDetail?.startInfo?.regeocode?.addressComponent?.district || "",
    };

    const endInfo = {
      country: routeDetail?.endInfo?.regeocode?.addressComponent?.country || "",
      province:
        routeDetail?.endInfo?.regeocode?.addressComponent?.province || "",
      city: routeDetail?.endInfo?.regeocode?.addressComponent?.city || "",
      district:
        routeDetail?.endInfo?.regeocode?.addressComponent?.district || "",
    };

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
      distanceInKm,
      formattedTime,
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
