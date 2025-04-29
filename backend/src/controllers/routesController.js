const Route = require("../models/routeModel");
const redisClient = require("../utils/redisClient");
const {
  generateRouteHash,
  fetchRoutesFromAPI,
} = require("../utils/routesHelpers");
const formatLngLatGeo = require("../utils/formatLngLatGeo");
const getRouteDataByMode = require("../utils/getRouteDataByMode");
const normalizeTransitRouteDetail = require("../utils/normalizeTransitRouteDetail");

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

  if (!startLng || !startLat || !endLng || !endLat) {
    return res.status(400).json({ message: "缺少必要的经纬参数" });
  }

  const route_hash = generateRouteHash({
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
  });

  try {
    const polylineFromRedis = await redisClient.get(`route:${route_hash}`);

    const routeDetailFromDB = await Route.findOne({ route_hash });

    if (polylineFromRedis && routeDetailFromDB) {
      return res.json({
        polyline: JSON.parse(polylineFromRedis),
        routeDetail: routeDetailFromDB,
        cached: true,
      });
    }

    const { startInfo, endInfo } = await formatLngLatGeo(
      startLng,
      startLat,
      endLng,
      endLat
    );

    const { routeDataFromAPI } = await fetchRoutesFromAPI(
      strategy,
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

    res.json({ route_hash, polyline, routeDetail, cached: false });

    saveRoutes({ route_hash, routeDetail, polyline, mode });
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

    let normalizedRouteDetail = routeDetail;

    if (mode === "transit") {
      normalizedRouteDetail = normalizeTransitRouteDetail(routeDetail);
    }

    await redisClient.setEx(
      `route:${route_hash}`,
      3600,
      JSON.stringify(polyline)
    );

    await Route.create({
      ...normalizedRouteDetail,
      route_hash,
      source: "api",
    });

    console.log(`路线 ${route_hash} 存储成功`);
  } catch (error) {
    console.error("保存路线失败", error);
  }
};

module.exports = {
  getRoutes,
  saveRoutes,
};
