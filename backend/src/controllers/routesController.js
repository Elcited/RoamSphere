const TransitRoute = require("../models/transitRouteModel");
const DrivingRoute = require("../models/drivingRouteModel");
const CyclingRoute = require("../models/cyclingRouteModel");
const WalkingRoute = require("../models/walkingRouteModel");
const normalizeDrivingRouteDetail = require("../utils/normalizeDrivingRouteDetail");
const normalizeCyclingRouteDetail = require("../utils/normalizeCyclingRouteDetail");
const normalizeWalkingRouteDetail = require("../utils/normalizeWalkingRouteDetail");
const redisClient = require("../utils/redisClient");
const {
  generateRouteHashes,
  fetchRoutesFromAPI,
} = require("../utils/routesHelpers");
const formatLngLatGeo = require("../utils/formatLngLatGeo");
const getRouteDataByMode = require("../utils/getRouteDataByMode");
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

const getRoutes = async (req, res) => {
  const {
    strategy,
    mode,
    startName,
    startLng,
    startLat,
    endName,
    endLng,
    endLat,
  } = req.query;

  const route_hashes = generateRouteHashes({
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
  });

  try {
    const results = [];

    const { startInfo, endInfo } = await formatLngLatGeo(
      startLng,
      startLat,
      endLng,
      endLat
    );

    const RouteModel = MODE_MODEL_MAP[mode];
    if (!RouteModel) {
      return res.status(400).json({ message: `不支持的出行方式: ${mode}` });
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

      saveRoutes({ route_hash: hash, routeDetail, polyline, mode });
    }

    res.json({ routes: results });
  } catch (error) {
    console.error("路线获取失败", error);
    res.status(500).json({ message: "路线查询出错" });
  }
};

const saveRoutes = async ({ route_hash, routeDetail, polyline, mode }) => {
  try {
    if (!route_hash || !routeDetail || !polyline) {
      console.warn("缺少存储路线的数据，跳过保存");
      return;
    }

    const RouteModel = MODE_MODEL_MAP[mode];
    const normalizeFn = NORMALIZE_FN_MAP[mode];

    if (!RouteModel || !normalizeFn) {
      console.warn(`不支持的出行方式 ${mode}，跳过保存`);
      return;
    }

    const existingRoute = await RouteModel.findOne({ route_hash });
    if (existingRoute) {
      console.log(`路线 ${route_hash} 已存在，跳过数据库写入`);
    } else {
      const normalizedRouteDetail = normalizeFn(routeDetail);

      await RouteModel.create({
        ...normalizedRouteDetail,
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
  } catch (error) {
    console.error("保存路线失败", error);
  }
};

module.exports = {
  getRoutes,
  saveRoutes,
};
