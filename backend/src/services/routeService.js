const redisClient = require("../utils/redisClient");
const {
  generateRouteHashes,
  fetchRoutesFromAPI,
} = require("../utils/routesHelpers");
const formatLngLatGeo = require("../utils/formatLngLatGeo");
const getRouteDataByMode = require("../utils/getRouteDataByMode");
const extractCitynamesFromGeo = require("../utils/extractCitiesFromRegeo");
const { recordCitiesFromResults } = require("./userActivityService");

const TransitRoute = require("../models/transitRouteModel");
const DrivingRoute = require("../models/drivingRouteModel");
const CyclingRoute = require("../models/cyclingRouteModel");
const WalkingRoute = require("../models/walkingRouteModel");

const normalizeDrivingRouteDetail = require("../utils/normalizeDrivingRouteDetail");
const normalizeCyclingRouteDetail = require("../utils/normalizeCyclingRouteDetail");
const normalizeWalkingRouteDetail = require("../utils/normalizeWalkingRouteDetail");
const normalizeTransitRouteDetail = require("../utils/normalizeTransitRouteDetail");

const MODE_MODEL_MAP = {
  transit: TransitRoute,
  driving: DrivingRoute,
  cycling: CyclingRoute,
  walking: WalkingRoute,
};

const NORMALIZE_FN_MAP = {
  transit: normalizeTransitRouteDetail,
  driving: normalizeDrivingRouteDetail,
  cycling: normalizeCyclingRouteDetail,
  walking: normalizeWalkingRouteDetail,
};

const getRoutesData = async ({
  strategy,
  mode,
  startName,
  startLng,
  startLat,
  endName,
  endLng,
  endLat,
  userId,
}) => {
  const route_hashes = generateRouteHashes({
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
  });

  const results = [];
  const { startInfo, endInfo } = await formatLngLatGeo(
    startLng,
    startLat,
    endLng,
    endLat
  );

  // 用户行为记录逻辑
  if (userId) {
    const cityRecords = extractCitynamesFromGeo(startInfo, endInfo);
    if (cityRecords.length > 0) {
      await recordCitiesFromResults(userId, cityRecords);
    }
  }

  const RouteModel = MODE_MODEL_MAP[mode];
  const normalizeFn = NORMALIZE_FN_MAP[mode];

  if (!RouteModel || !normalizeFn) {
    throw new Error(`不支持的出行方式: ${mode}`);
  }

  for (const { strategy: s, hash } of route_hashes) {
    const polylineFromRedis = await redisClient.get(`route:${hash}`);
    const routeDetailFromDB = await RouteModel.findOne({ route_hash: hash });

    if (polylineFromRedis && routeDetailFromDB) {
      results.push({
        strategy: s,
        route_hash: hash,
        polyline: JSON.parse(polylineFromRedis),
        routeDetail: routeDetailFromDB,
        cached: true,
      });
      continue;
    }

    const { routeDataFromAPI } = await fetchRoutesFromAPI(
      s,
      mode,
      startLng,
      startLat,
      endLng,
      endLat,
      startInfo,
      endInfo
    );

    const { routeDetail, polyline } = getRouteDataByMode(
      mode,
      routeDataFromAPI,
      startName,
      endName,
      startInfo,
      endInfo
    );

    results.push({
      strategy: s,
      route_hash: hash,
      polyline,
      routeDetail,
      cached: false,
    });

    await saveRoute({
      route_hash: hash,
      routeDetail,
      polyline,
      mode,
      RouteModel,
      normalizeFn,
    });
  }

  return results;
};

const saveRoute = async ({
  route_hash,
  routeDetail,
  polyline,
  mode,
  RouteModel,
  normalizeFn,
}) => {
  try {
    if (!route_hash || !routeDetail || !polyline) return;

    const exists = await RouteModel.findOne({ route_hash });
    if (!exists) {
      const normalized = normalizeFn(routeDetail);
      await RouteModel.create({
        ...normalized,
        route_hash,
        source: "api",
      });
      console.log(`路线 ${route_hash} 存储成功`);
    }

    await redisClient.setEx(
      `route:${route_hash}`,
      3600,
      JSON.stringify(polyline)
    );
  } catch (err) {
    console.error("保存路线失败", err);
  }
};

module.exports = {
  getRoutesData,
};
