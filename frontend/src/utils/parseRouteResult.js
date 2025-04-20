export default function parseRouteResult({ polyline, routeDetail }) {
  const polylinesForRenderRoutes = polyline.polylines
    .flatMap(polyline => polyline.split(";"))
    .map(polyline => polyline.split(","));
  const polylinesForRenderDetails = polyline.polylines;
  const instructions = polyline.instructions;
  const cities = polyline.cities.flatMap(city => city);
  const navigations = polyline.navigations;
  const orientations = polyline.orientations;
  const tmcs = polyline.tmcs;

  const startLocation = routeDetail.start_location;
  const endLocation = routeDetail.end_location;

  const distance = routeDetail.distance;
  const distanceInKm = (distance / 1000).toFixed(2);

  const duration = routeDetail.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  const taxi_costs = routeDetail.taxi_costs;
  const totalTolls = routeDetail.totalTolls;
  const trafficLights = routeDetail.traffic_lights;
  const travel_mode = routeDetail.travel_mode;
  const startInfo = {
    country: routeDetail.startInfo.regeocode.addressComponent.country,
    province: routeDetail.startInfo.regeocode.addressComponent.province,
    city: routeDetail.startInfo.regeocode.addressComponent.city,
    district: routeDetail.startInfo.regeocode.addressComponent.district,
  };

  const endInfo = {
    country: routeDetail.endInfo.regeocode.addressComponent.country,
    province: routeDetail.endInfo.regeocode.addressComponent.province,
    city: routeDetail.endInfo.regeocode.addressComponent.city,
    district: routeDetail.endInfo.regeocode.addressComponent.district,
  };

  const parsedRoutePolyline = {
    polylinesForRenderRoutes,
    polylinesForRenderDetails,
    instructions,
    cities,
    navigations,
    orientations,
    tmcs,
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

  return { polylinesForRenderRoutes, parsedRoutePolyline, parsedRouteDetail };
}
