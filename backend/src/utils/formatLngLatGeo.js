const API_REQUEST_KEY = process.env.API_REQUEST_KEY;

const withRetry = async (fn, retryTimes = 1, delayMs = 200) => {
  let lastError;
  for (let attempt = 0; attempt <= retryTimes; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retryTimes) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        console.warn(`第 ${attempt + 1} 次重试中...`);
      }
    }
  }
  throw lastError;
};

const fetchGeoData = async (lng, lat) => {
  const fn = async () => {
    const response = await fetch(
      `https://restapi.amap.com/v3/geocode/regeo?location=${lng},${lat}&key=${API_REQUEST_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP 状态码 ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.status !== "1") {
      throw new Error(`返回异常数据: ${JSON.stringify(data)}`);
    }
    return { success: true, ...data };
  };

  try {
    return await withRetry(fn, 1, 300);
  } catch (error) {
    console.error(`高德API最终失败: ${error.message}`);
    return { success: false, lng, lat };
  }
};

const formatLngLatGeo = async (startLng, startLat, endLng, endLat) => {
  const [startInfo, endInfo] = await Promise.all([
    fetchGeoData(startLng, startLat),
    fetchGeoData(endLng, endLat),
  ]);

  return { startInfo, endInfo };
};

module.exports = formatLngLatGeo;
