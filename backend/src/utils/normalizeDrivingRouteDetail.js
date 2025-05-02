function normalizeDrivingRouteDetail(routeDetail, route_hash) {
  if (!routeDetail) return null;

  const normalizeCoordinates = coordStr => {
    if (!coordStr) return [0, 0];
    return coordStr.split(",").map(Number);
  };

  return {
    start_location: {
      name: routeDetail.start_location?.name || "",
      coordinates: normalizeCoordinates(
        routeDetail.start_location?.coordinates
      ),
    },
    end_location: {
      name: routeDetail.end_location?.name || "",
      coordinates: normalizeCoordinates(routeDetail.end_location?.coordinates),
    },
    startInfo: routeDetail.startInfo || {},
    endInfo: routeDetail.endInfo || {},
    taxi_cost: Number(routeDetail.taxi_cost) || 0,
    distance: Number(routeDetail.distance) || 0,
    duration: Number(routeDetail.duration) || 0,
    totalTolls: Number(routeDetail.totalTolls) || 0,
    traffic_lights: Number(routeDetail.traffic_lights) || 0,
    travel_mode: routeDetail.travel_mode || "driving",
    route_hash: route_hash || "",
  };
}

module.exports = normalizeDrivingRouteDetail;
