const Route = require("../models/routeModel");
const redisClient = require("../utils/redisClient");
const generateRouteHash = require("../utils/generateRouteHash");
const fetchRoutesFromAPI = require("../utils/fetchRoutesFromAPI");
const formatRouteResultDB = require("../utils/formatRouteResultDB");
const formatRouteResultRedis = require("../utils/formatRouteResultRedis");
const formatLngLatGeo = require("../utils/formatLngLatGeo");

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

  console.log(route_hash);

  try {
    // 1. 先查 Redis（polyline）
    const polylineFromRedis = await redisClient.get(`route:${route_hash}`);

    // 2. 查 MongoDB（简要信息）
    const routeDetailFromDB = await Route.findOne({ route_hash });

    // 如果都存在，直接返回
    if (polylineFromRedis && routeDetailFromDB) {
      return res.json({
        polyline: JSON.parse(polylineFromRedis),
        routeDetail: routeDetailFromDB,
        cached: true,
      });
    }

    // 3. 不存在就从高德拉
    const { routeDataFromAPI } = await fetchRoutesFromAPI(
      strategy,
      mode,
      startLng,
      startLat,
      endLng,
      endLat
    );

    const { startInfo, endInfo } = await formatLngLatGeo(
      startLng,
      startLat,
      endLng,
      endLat
    );

    const routeDetail = formatRouteResultDB(
      routeDataFromAPI,
      mode,
      startName,
      endName,
      startInfo,
      endInfo
    );

    const polyline = formatRouteResultRedis(routeDataFromAPI);

    await redisClient.setEx(
      `route:${route_hash}`,
      3600,
      JSON.stringify(polyline)
    ); // 缓存1小时
    await Route.create({ ...routeDetail, route_hash, source: "api" });

    // 5. 返回给前端
    res.json({ polyline, routeDetail, cached: false });
  } catch (error) {
    console.error("路线获取失败", error);
    res.status(500).json({ message: "路线查询出错" });
  }
};

module.exports = {
  getRoutes,
};
