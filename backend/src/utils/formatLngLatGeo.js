const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

async function formatLngLatGeo(startLng, startLat, endLng, endLat) {
  try {
    const [res1, res2] = await Promise.all([
      fetch(
        `https://restapi.amap.com/v3/geocode/regeo?location=${startLng},${startLat}&key=${API_REQUEST_KEY}`
      ),
      fetch(
        `https://restapi.amap.com/v3/geocode/regeo?location=${endLng},${endLat}&key=${API_REQUEST_KEY}`
      ),
    ]);

    if (!res1.ok || !res2.ok) throw new Error("经纬度转地址失败！");

    const startInfo = await res1.json();
    const endInfo = await res2.json();

    return { startInfo, endInfo };
  } catch (e) {
    throw new Error("经纬度转地址出错了！");
  }
}

module.exports = formatLngLatGeo;
