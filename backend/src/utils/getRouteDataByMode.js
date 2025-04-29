const {
  formatDrivingRouteResultDB,
  formatDrivingRouteResultRedis,
  formatWalkingRouteResultDB,
  formatWalkingRouteResultRedis,
  formatTransitRouteResultDB,
  formatTransitRouteResultRedis,
  formatCyclingRouteResultDB,
  formatCyclingRouteResultRedis,
} = require("../utils/routesHelpers");

function getRouteDataByMode(
  mode,
  routeDataFromAPI,
  startName,
  endName,
  startInfo,
  endInfo
) {
  let routeDetail = null;
  let polyline = null;

  if (mode === "driving") {
    routeDetail = formatDrivingRouteResultDB(
      routeDataFromAPI,
      mode,
      startName,
      endName,
      startInfo,
      endInfo
    );
    polyline = formatDrivingRouteResultRedis(routeDataFromAPI);
  } else if (mode === "transit") {
    routeDetail = formatTransitRouteResultDB(
      routeDataFromAPI,
      mode,
      startName,
      endName,
      startInfo,
      endInfo
    );
    polyline = formatTransitRouteResultRedis(routeDataFromAPI);
  } else if (mode === "walking") {
    routeDetail = formatWalkingRouteResultDB(
      routeDataFromAPI,
      mode,
      startName,
      endName,
      startInfo,
      endInfo
    );
    polyline = formatWalkingRouteResultRedis(routeDataFromAPI);
  } else if (mode === "cycling") {
    routeDetail = formatCyclingRouteResultDB(
      routeDataFromAPI,
      mode,
      startName,
      endName,
      startInfo,
      endInfo
    );
    polyline = formatCyclingRouteResultRedis(routeDataFromAPI);
  }
  return { routeDetail, polyline };
}

module.exports = getRouteDataByMode;
