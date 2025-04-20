function formatRouteResultDB(
  routeDataFromAPI,
  mode,
  startName,
  endName,
  startInfo,
  endInfo
) {
  if (!routeDataFromAPI.route) {
    throw new Error("No routes found in the result data.");
  }

  const start_lnglat = routeDataFromAPI.route.origin.split(",");
  const end_lnglat = routeDataFromAPI.route.destination.split(",");
  const taxi_cost = Number(routeDataFromAPI.route.taxi_cost);
  const distance = Number(routeDataFromAPI.route.paths[0].distance);
  const duration = Number(routeDataFromAPI.route.paths[0].cost.duration);
  const totalTolls = Number(routeDataFromAPI.route.paths[0].cost.tolls);
  const traffic_lights = Number(
    routeDataFromAPI.route.paths[0].cost.traffic_lights
  );

  const routeDetail = {
    start_location: {
      name: startName,
      coordinates: start_lnglat,
    },
    end_location: {
      name: endName,
      coordinates: end_lnglat,
    },
    startInfo,
    endInfo,
    taxi_cost,
    distance,
    duration,
    totalTolls,
    travel_mode: mode,
    traffic_lights,
  };

  return routeDetail;
}

module.exports = formatRouteResultDB;
