const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

const fetchGeoData = async (lng, lat) => {
  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/geocode/regeo?location=${lng},${lat}&key=${API_REQUEST_KEY}`
    );
    if (!response.ok) {
      throw new Error(`高德API请求失败，状态码: ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.status !== "1") {
      throw new Error("高德API返回无效数据");
    }
    return data;
  } catch (error) {
    throw new Error(`经纬度转地址出错: ${error.message}`);
  }
};

const formatLngLatGeo = async (startLng, startLat, endLng, endLat) => {
  try {
    const [startInfo, endInfo] = await Promise.all([
      fetchGeoData(startLng, startLat),
      fetchGeoData(endLng, endLat),
    ]);

    return { startInfo, endInfo };
  } catch (error) {
    console.error(error.message);
    throw new Error("经纬度转地址出错了！");
  }
};

module.exports = formatLngLatGeo;
