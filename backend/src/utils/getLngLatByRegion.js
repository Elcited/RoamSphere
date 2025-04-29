async function getLngLatByRegion(regionName) {
  const url = `https://restapi.amap.com/v3/config/district?keywords=${encodeURIComponent(
    regionName
  )}&subdistrict=0&key=${API_REQUEST_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1" || !data.districts || data.districts.length === 0) {
      console.warn("高德行政区查询失败:", data);
      return null;
    }

    const { center } = data.districts[0];
    if (!center) return null;

    const [lng, lat] = center.split(",").map(Number);
    return [lng, lat];
  } catch (error) {
    console.error("调用高德行政区查询失败:", error);
    return null;
  }
}

module.exports = getLngLatByRegion;
