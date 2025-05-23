function normalizeWalkingRouteDetail(routeDetail) {
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
    distance: Number(routeDetail.distance) || 0,
    duration: Number(routeDetail.duration) || 0,
    travel_mode: routeDetail.travel_mode || "walking",
    route_hash: routeDetail.route_hash || "",
  };
}

module.exports = normalizeWalkingRouteDetail;
