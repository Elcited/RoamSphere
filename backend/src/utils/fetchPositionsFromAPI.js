const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

async function fetchPositionsFromAPI(
  geo = "",
  lnglat = [],
  type = "",
  keyword,
  region = "长沙",
  radius = 10000
) {
  try {
    let url;

    if (lnglat?.length === 2) {
      const [lng, lat] = lnglat;
      url = `https://restapi.amap.com/v5/place/around?location=${lng},${lat}&radius=${radius}&types=${type}&show_fields=business,indoor,navi,photos,children&key=${API_REQUEST_KEY}`;
    } else if (keyword && region) {
      url = `https://restapi.amap.com/v5/place/text?keywords=${encodeURIComponent(
        keyword
      )}&region=${encodeURIComponent(
        region
      )}&show_fields=business,indoor,navi,photos,children&key=${API_REQUEST_KEY}`;
    } else {
      throw new Error("必须提供 location 或 keyword 之一");
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`请求失败: ${res.status} ${res.statusText}`);

    const data = await res.json();
    if (data.status !== "1" || !Array.isArray(data.pois)) {
      throw new Error(`高德返回异常: ${data.info || "未知错误"}`);
    }

    return { data };
  } catch (err) {
    console.error("fetchPositionsFromAPI error:", err);
    throw err;
  }
}

module.exports = fetchPositionsFromAPI;
