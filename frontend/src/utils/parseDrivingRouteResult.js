export default function parseDrivingRouteResult({ polyline, routeDetail }) {
  // 防止 polyline 为 null 或 undefined 的情况
  const polylinesForRenderRoutes =
    polyline?.polylines
      ?.flatMap(polyline => polyline.split(";"))
      ?.map(polyline => polyline.split(",")) || []; // 如果没有值，返回空数组

  // 同样处理其他 polyline 相关的字段
  const polylinesForRenderDetails = polyline?.polylines || [];
  const instructions = polyline?.instructions || [];
  const cities = polyline?.cities?.flatMap(city => city) || [];
  const navigations = polyline?.navigations || [];
  const orientations = polyline?.orientations || [];
  const roadStatus = polyline?.roadStatus || [];
  const roadDistance = polyline?.roadDistance || 0;

  // 检查 routeDetail 是否存在，并且属性是否正确
  const startLocation = routeDetail?.start_location || {};
  const endLocation = routeDetail?.end_location || {};

  const distance = routeDetail?.distance || 0;
  const distanceInKm = (distance / 1000).toFixed(2);

  const duration = routeDetail?.duration || 0;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  const taxi_costs = routeDetail?.taxi_costs || 0;
  const totalTolls = routeDetail?.totalTolls || 0;
  const trafficLights = routeDetail?.traffic_lights || 0;
  const travel_mode = routeDetail?.travel_mode || "unknown";

  // 避免 startInfo 和 endInfo 为 null 或 undefined
  const startInfo = {
    country: routeDetail?.startInfo?.regeocode?.addressComponent?.country || "",
    province:
      routeDetail?.startInfo?.regeocode?.addressComponent?.province || "",
    city: routeDetail?.startInfo?.regeocode?.addressComponent?.city || "",
    district:
      routeDetail?.startInfo?.regeocode?.addressComponent?.district || "",
  };

  const endInfo = {
    country: routeDetail?.endInfo?.regeocode?.addressComponent?.country || "",
    province: routeDetail?.endInfo?.regeocode?.addressComponent?.province || "",
    city: routeDetail?.endInfo?.regeocode?.addressComponent?.city || "",
    district: routeDetail?.endInfo?.regeocode?.addressComponent?.district || "",
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
  };

  const parsedRouteDetail = {
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
}
