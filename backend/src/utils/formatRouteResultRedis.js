function formatRouteResultRedis(routeDataFromAPI) {
  const polylines = routeDataFromAPI.route.paths[0].steps.map(
    step => step.polyline
  );

  const instructions = routeDataFromAPI.route.paths[0].steps.map(
    step => step.instruction
  );

  const cities = routeDataFromAPI.route.paths[0].steps.map(step => step.cities);

  const orientations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.orientation
  );

  const navigations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.navi.action
  );

  const tmcs = routeDataFromAPI.route.paths[0].steps.map(step =>
    step.tmcs.map(tmc => tmc.tmc_status)
  );

  return {
    polylines,
    instructions,
    cities,
    orientations,
    navigations,
    tmcs,
  };
}

module.exports = formatRouteResultRedis;
