const {
  getPositionsByRegionKeyword,
  getPositionsByLocationType,
} = require("../services/positionService");

async function getPositions(req, res) {
  const { location, region, keyword, type, radius = 5000 } = req.query;

  if (!keyword && !location) {
    return res.status(400).json({ error: "必须包含 keyword 或 location 参数" });
  }

  try {
    if (keyword && region) {
      const result = await getPositionsByRegionKeyword(
        keyword,
        region,
        radius,
        req.user?._id
      );
      return res.json(result);
    }

    if (location && !keyword) {
      const [lng, lat] = location.split(",").map(Number);
      const result = await getPositionsByLocationType(
        [lng, lat],
        type,
        radius,
        req.user?._id
      );
      return res.json(result);
    }

    return res.status(400).json({ error: "不支持的参数组合" });
  } catch (error) {
    console.error("获取位置信息失败:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
}

module.exports = {
  getPositions,
};
