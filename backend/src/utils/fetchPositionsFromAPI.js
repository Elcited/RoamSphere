const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

async function fetchAttractionsFromAPI(lnglat) {
  try {
    const res = await fetch(
      `https://restapi.amap.com/v5/place/around?location=${lnglat[0]},${
        lnglat[1]
      }&radius=10000&types=${110200}&show_fields=business,indoor,navi,photos,children&key=${API_REQUEST_KEY}`
    );

    if (!res.ok) throw new Error(`高德请求地点时出错! ${res.status}`);

    const attractionsDataFromAPI = await res.json();

    if (
      attractionsDataFromAPI.status !== "1" ||
      !attractionsDataFromAPI?.pois?.length
    ) {
      throw new Error(
        `高德返回无效：${attractionsDataFromAPI.info || "未知错误"}`
      );
    }

    return { attractionsDataFromAPI };
  } catch (err) {
    console.error("fetchRoutesFromAPI error:", err);
    throw err;
  }
}

module.exports = fetchAttractionsFromAPI;
