const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

function generateRouteHash({
  strategy,
  mode,
  startLng,
  startLat,
  endLng,
  endLat,
}) {
  const raw = {
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
  };

  const str = JSON.stringify(raw);

  // 使用 crypto 生成 SHA256 哈希值
  const hash = crypto.createHash("sha256").update(str).digest("hex");

  return hash;
}

function getUrl(
  strategy,
  mode,
  startLng,
  startLat,
  endLng,
  endLat,
  city1,
  city2
) {
  let url = null;
  console.log(city1, city2);

  switch (mode) {
    case "driving":
      url = `https://restapi.amap.com/v5/direction/${mode}?strategy=${strategy}&origin=${startLng},${startLat}&destination=${endLng},${endLat}&show_fields=cost,cities,polyline,tmcs,navi&key=${API_REQUEST_KEY}`;
      break;
    case "transit":
      url = `https://restapi.amap.com/v5/direction/transit/integrated?origin=${startLng},${startLat}&destination=${endLng},${endLat}&key=${API_REQUEST_KEY}&city1=${city1}&city2=${city2}&show_fields=navi,cost,polyline`;
      break;
    case "walking":
      url = `https://restapi.amap.com/v5/direction/${mode}?isindoor=0&origin=${startLng},${startLat}&destination=${endLng},${endLat}&show_fields=navi,cost,polyline&key=${API_REQUEST_KEY}`;
      break;
    case "cycling":
      url = `https://restapi.amap.com/v5/direction/bicycling?origin=${startLng},${startLat}&destination=${endLng},${endLat}&key=${API_REQUEST_KEY}&show_fields=navi,cost,polyline`;
      break;
    default:
      throw new Error("Invalid mode");
  }

  return url;
}

function formatDrivingRouteResultDB(
  routeDataFromAPI,
  mode,
  startName,
  endName,
  startInfo,
  endInfo
) {
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

function formatDrivingRouteResultRedis(routeDataFromAPI) {
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

  const roadStatus = routeDataFromAPI.route.paths[0].steps.map(step =>
    step.tmcs.map(tmc => tmc.tmc_status)
  );

  const roadDistance = routeDataFromAPI.route.paths[0].steps.map(step =>
    step.tmcs.map(tmc => tmc.tmc_distance)
  );

  return {
    polylines,
    instructions,
    cities,
    orientations,
    navigations,
    roadStatus,
    roadDistance,
  };
}

function formatWalkingRouteResultDB(
  routeDataFromAPI,
  mode,
  startName,
  endName,
  startInfo,
  endInfo
) {
  const start_lnglat = routeDataFromAPI.route.origin.split(",");
  const end_lnglat = routeDataFromAPI.route.destination.split(",");
  const distance = Number(routeDataFromAPI.route.paths[0].distance);
  const duration = Number(routeDataFromAPI.route.paths[0].cost.duration);

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
    distance,
    duration,
    travel_mode: mode,
  };

  return routeDetail;
}

function formatWalkingRouteResultRedis(routeDataFromAPI) {
  const polylines = routeDataFromAPI.route.paths[0].steps.map(
    step => step.polyline
  );

  const instructions = routeDataFromAPI.route.paths[0].steps.map(
    step => step.instruction
  );

  const orientations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.orientation
  );

  const navigations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.navi.action
  );

  const walkTypes = routeDataFromAPI.route.paths[0].steps.map(
    step => step.navi.walk_type
  );

  return {
    polylines,
    instructions,
    orientations,
    navigations,
    walkTypes,
  };
}

function formatTransitRouteResultDB(
  routeDataFromAPI,
  mode,
  startName,
  endName,
  startInfo,
  endInfo
) {
  if (
    !routeDataFromAPI ||
    !routeDataFromAPI.route.transits ||
    !Array.isArray(routeDataFromAPI.route.transits)
  ) {
    return [];
  }

  const start_lnglat = routeDataFromAPI.route.origin.split(",");
  const end_lnglat = routeDataFromAPI.route.destination.split(",");

  const transit_options = (routeDataFromAPI.route.transits || [])
    .slice(0, 5)
    .map(transit => {
      const segments = (transit.segments || [])
        .map(segment => {
          let segmentData = {};

          if (segment.walking) {
            segmentData.walking = {
              origin: segment.walking.origin.split(","),
              destination: segment.walking.destination.split(","),
              distance: Number(segment.walking.distance),
              duration: Number(segment.walking.cost.duration),
            };
          }

          if (segment.bus && segment.bus.buslines.length > 0) {
            segmentData.bus = segment.bus.buslines
              .filter(busline => busline.type.includes("公交线路"))
              .map(busline => ({
                departure_stop: {
                  name: busline.departure_stop.name,
                  id: busline.departure_stop.id,
                  location: busline.departure_stop.location,
                },
                arrival_stop: {
                  name: busline.arrival_stop.name,
                  id: busline.arrival_stop.id,
                  location: busline.arrival_stop.location,
                },
                name: busline.name,
                id: busline.id,
                type: busline.type,
                distance: busline.distance,
                cost: {
                  duration: busline.cost.duration,
                },
                via_num: busline.via_num,
                via_stops: busline.via_stops.map(viaStop => ({
                  name: viaStop.name,
                  id: viaStop.id,
                  location: viaStop.location,
                })),
              }));

            segmentData.subway = segment.bus.buslines
              .filter(busline => busline.type.includes("地铁线路"))
              .map(subwayline => ({
                departure_stop: {
                  name: subwayline.departure_stop.name,
                  id: subwayline.departure_stop.id,
                  location: subwayline.departure_stop.location,
                  entrance: subwayline.departure_stop.entrance,
                },
                arrival_stop: {
                  name: subwayline.arrival_stop.name,
                  id: subwayline.arrival_stop.id,
                  location: subwayline.arrival_stop.location,
                  exit: subwayline.arrival_stop.exit,
                },
                name: subwayline.name,
                id: subwayline.id,
                type: subwayline.type,
                distance: subwayline.distance,
                cost: {
                  duration: subwayline.cost.duration,
                },
                via_num: subwayline.via_num,
                via_stops: subwayline.via_stops.map(viaStop => ({
                  name: viaStop.name,
                  id: viaStop.id,
                  location: viaStop.location,
                })),
              }));

            segmentData.cityRailway = segment.bus.buslines
              .filter(busline => busline.name.includes("城际"))
              .map(busline => ({
                departure_stop: {
                  name: busline.departure_stop.name,
                  id: busline.departure_stop.id,
                  location: busline.departure_stop.location,
                },
                arrival_stop: {
                  name: busline.arrival_stop.name,
                  id: busline.arrival_stop.id,
                  location: busline.arrival_stop.location,
                },
                name: busline.name,
                id: busline.id,
                type: "城际铁轨",
                distance: busline.distance,
                cost: {
                  duration: busline.cost.duration,
                },
                via_num: busline.via_num,
                via_stops: busline.via_stops.map(viaStop => ({
                  name: viaStop.name,
                  id: viaStop.id,
                  location: viaStop.location,
                })),
              }));
          }

          if (segment.railway) {
            segmentData.railway = {
              id: segment.railway.id,
              duration: segment.railway.time,
              name: segment.railway.name,
              trip: segment.railway.trip,
              distance: segment.railway.distance,
              type: segment.railway.type,
              departure_stop: {
                name: segment.railway.departure_stop.name,
                id: segment.railway.departure_stop.id,
                location: segment.railway.departure_stop.location,
                adcode: segment.railway.departure_stop.adcode,
                departure_time: segment.railway.departure_stop.time,
                isOriginStop: segment.railway.departure_stop.start,
              },
              arrival_stop: {
                name: segment.railway.arrival_stop.name,
                id: segment.railway.arrival_stop.id,
                location: segment.railway.arrival_stop.location,
                adcode: segment.railway.arrival_stop.adcode,
                arrival_time: segment.railway.arrival_stop.time,
                isFinalStop: segment.railway.arrival_stop.end,
              },
              railway_spaces: [segment.railway.spaces.map(space => space)],
            };
          }

          if (segment.taxi) {
            segment.taxi = {
              distance: segment.taxi.distance,
              price: segment.taxi.price,
              drivetime: segment.taxi.drivetime,
              startpoint: segment.taxi.startpoint,
              startname: segment.taxi.startname,
              endpoint: segment.taxi.endpoint,
              endname: segment.taxi.endname,
            };
          }

          return segmentData;
        })
        .filter(Boolean);

      return {
        duration: Number(transit.cost.duration),
        transit_fee: Number(transit.cost.transit_fee),
        distance: Number(transit.distance),
        walking_distance: Number(transit.walking_distance),
        nightflag: transit.nightflag,
        segments,
      };
    });

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
    travel_mode: mode,
    transit_options,
  };

  return routeDetail;
}

function formatTransitRouteResultRedis(routeDataFromAPI) {
  if (
    !routeDataFromAPI ||
    !routeDataFromAPI.route.transits ||
    !Array.isArray(routeDataFromAPI.route.transits)
  ) {
    return [];
  }

  return routeDataFromAPI.route.transits.map(transit => {
    const segments = (transit.segments || []).map(segment => {
      let segmentData = {};

      if (segment.walking) {
        segmentData.walking = {
          instructions: (segment.walking.steps || []).map(
            step => step.instruction
          ),
          polyline: (segment.walking.steps || []).map(
            step => step.polyline.polyline
          ),
          navigations: (segment.walking.steps || []).map(
            step => step.navi.action
          ),
        };
      }

      if (
        segment.bus &&
        Array.isArray(segment.bus.buslines) &&
        segment.bus.buslines.length > 0
      ) {
        const busLines = segment.bus.buslines;

        const busPolyline = busLines
          .filter(busline => busline.type?.includes("公交线路"))
          .map(busline => busline.polyline?.polyline)
          .filter(Boolean);
        if (busPolyline.length > 0) {
          segmentData.bus = { polyline: busPolyline };
        }

        const subwayPolyline = busLines
          .filter(busline => busline.type?.includes("地铁线路"))
          .map(busline => busline.polyline?.polyline)
          .filter(Boolean);
        if (subwayPolyline.length > 0) {
          segmentData.subway = { polyline: subwayPolyline };
        }

        const cityRailwayPolyline = busLines
          .filter(busline => busline.name?.includes("城际"))
          .map(busline => busline.polyline?.polyline)
          .filter(Boolean);
        if (cityRailwayPolyline.length > 0) {
          segmentData.taxi = { polyline: cityRailwayPolyline };
        }
      }

      if (segment.taxi) {
        segmentData.taxi = {
          polyline: segment.taxi.polyline.polyline,
        };
      }
      return segmentData;
    });
    return { segments };
  });
}

function formatCyclingRouteResultDB(
  routeDataFromAPI,
  mode,
  startName,
  endName,
  startInfo,
  endInfo
) {
  if (
    !routeDataFromAPI ||
    !routeDataFromAPI.route.paths ||
    !Array.isArray(routeDataFromAPI.route.paths)
  ) {
    return [];
  }

  const start_lnglat = routeDataFromAPI?.route
    ? routeDataFromAPI.route.origin.split(",").map(Number)
    : [];
  const end_lnglat = routeDataFromAPI?.route
    ? routeDataFromAPI.route.destination.split(",").map(Number)
    : [];
  const distance = Number(routeDataFromAPI.route.paths[0].distance);
  const duration = Number(routeDataFromAPI.route.paths[0].duration);

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
    distance,
    duration,
    travel_mode: mode,
  };

  return routeDetail;
}

function formatCyclingRouteResultRedis(routeDataFromAPI) {
  if (
    !routeDataFromAPI ||
    !routeDataFromAPI.route.paths ||
    !Array.isArray(routeDataFromAPI.route.paths)
  ) {
    return [];
  }

  const instructions = routeDataFromAPI.route.paths[0].steps.map(
    step => step.instruction
  );

  const orientations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.orientation
  );

  const polylines = routeDataFromAPI.route.paths[0].steps.map(
    step => step.polyline
  );

  const step_distance = routeDataFromAPI.route.paths[0].steps.map(
    step => step.step_distance
  );

  const navigations = routeDataFromAPI.route.paths[0].steps.map(
    step => step.navi.action
  );

  return {
    instructions,
    orientations,
    polylines,
    step_distance,
    navigations,
  };
}

async function fetchRoutesFromAPI(
  strategy,
  mode,
  startLng,
  startLat,
  endLng,
  endLat,
  startInfo,
  endInfo
) {
  const city1 = startInfo.regeocode.addressComponent.citycode;
  const city2 = endInfo.regeocode.addressComponent.citycode;

  const url = getUrl(
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
    city1,
    city2
  );

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`高德请求失败：HTTP ${res.status}`);

    const routeDataFromAPI = await res.json();

    if (routeDataFromAPI.status !== "1") {
      throw new Error(`高德返回无效：${routeDataFromAPI.info || "未知错误"}`);
    }

    return { routeDataFromAPI };
  } catch (err) {
    console.error("fetchRoutesFromAPI error:", err);
    throw err;
  }
}

module.exports = {
  generateRouteHash,
  fetchRoutesFromAPI,
  formatDrivingRouteResultDB,
  formatDrivingRouteResultRedis,
  formatWalkingRouteResultDB,
  formatWalkingRouteResultRedis,
  formatTransitRouteResultDB,
  formatTransitRouteResultRedis,
  formatCyclingRouteResultDB,
  formatCyclingRouteResultRedis,
};
