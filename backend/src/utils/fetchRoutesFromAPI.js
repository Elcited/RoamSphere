const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const fetchRoutesFromAPI = async (
  strategy,
  mode,
  startLng,
  startLat,
  endLng,
  endLat
) => {
  console.log("fetchRoutesFromAPI里的strategy为：", strategy);
  const API_REQUEST_KEY = process.env.API_REQUEST_KEY;
  const url = `https://restapi.amap.com/v5/direction/${mode}?strategy=${strategy}&origin=${startLng},${startLat}&destination=${endLng},${endLat}&show_fields=cost,cities,polyline,tmcs,navi&key=${API_REQUEST_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`高德请求失败：HTTP ${res.status}`);

    const routeDataFromAPI = await res.json();

    if (
      routeDataFromAPI.status !== "1" ||
      !routeDataFromAPI.route?.paths?.length
    ) {
      throw new Error(`高德返回无效：${routeDataFromAPI.info || "未知错误"}`);
    }

    return { routeDataFromAPI };
  } catch (err) {
    console.error("fetchRoutesFromAPI error:", err);
    throw err;
  }
};

module.exports = fetchRoutesFromAPI;
