export const fetchAmapTips = async inputValue => {
  if (!inputValue) return []; // 输入为空时不做请求

  const url = `https://restapi.amap.com/v5/place/text`; // 高德文本搜索接口

  const params = new URLSearchParams({
    key: "YOUR_AMAP_API_KEY", // 你的高德 API Key
    keywords: inputValue, // 用户输入的关键字
    city: "CITY_NAME", // 可选，限定查询城市，避免返回不相关数据
    citylimit: true, // 限制返回的地点在指定城市内
    offset: 5, // 每页返回的最大记录数
    page: 1, // 页数，从1开始
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("请求失败");
    }

    const data = await response.json();

    if (data.status === "1" && data.pois) {
      // 返回匹配的地点信息
      return data.pois.map(poi => ({
        id: poi.id,
        name: poi.name,
        address: poi.address,
        location: poi.location, // 经纬度位置
      }));
    }

    return []; // 如果没有数据，返回空数组
  } catch (error) {
    console.error("高德API请求失败:", error);
    return []; // 错误时返回空数组
  }
};
