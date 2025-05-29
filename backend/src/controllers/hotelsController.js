const { fetchAndSaveHotelsNearLocation } = require("../services/hotelService");

async function getHotels(req, res) {
  const { location, radius = 10000 } = req.query;

  if (!location) {
    return res.status(400).json({ error: "缺少经纬度参数！" });
  }

  try {
    const [lng, lat] = location.split(",").map(Number);
    const result = await fetchAndSaveHotelsNearLocation(
      [lng, lat],
      radius,
      req.user?._id
    );

    res.json(result);
  } catch (error) {
    console.error("获取酒店失败:", error);
    res.status(500).json({ error: "服务器错误" });
  }
}

module.exports = { getHotels };
