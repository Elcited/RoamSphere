const Attraction = require("../models/attractionModel");
const Hotel = require("../models/hotelModel");
const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const getLngLatByRegion = require("../utils/getLngLatByRegion");
const { formatPositionResult } = require("../utils/positionsHelpers");

function classifyModelByType(type = "") {
  if (type.includes("风景名胜") || type.includes("旅游景点")) {
    return Attraction;
  }
  if (type.includes("住宿服务") || type.includes("宾馆")) {
    return Hotel;
  }
  return null;
}

async function getPositions(req, res) {
  const { location, region, keyword, type, radius = 5000 } = req.query;

  if (!keyword && !location) {
    return res.status(400).json({ error: "必须包含 keyword 或 location 参数" });
  }

  try {
    let lng, lat;

    // 场景 ① 搜索栏逻辑（keyword + region）
    if (keyword && region) {
      const geo = await getLngLatByRegion(region);
      console.log("geo", geo);
      if (!geo) {
        return res.status(400).json({ error: "region 无法转换为经纬度" });
      }

      const { data: apiData } = await fetchPositionsFromAPI(
        null,
        null,
        null,
        keyword,
        region,
        radius
      );
      const formattedPositions = formatPositionResult(apiData);
      let results = [];

      for (const position of formattedPositions) {
        const Model = classifyModelByType(position.type);

        if (Model) {
          const exists = await Model.findOne({
            position_id: position.position_id,
          });
          if (!exists) {
            await Model.create(position);
          }
          results.push(position);
        } else {
          results.push(position);
        }
      }

      return res.json({
        source: "api+db_check",
        positions: results,
      });
    }

    // 场景 ② SpeedDial 逻辑（location + type，无 keyword）
    if (location && !keyword) {
      [lng, lat] = location.split(",");

      const { data: apiData } = await fetchPositionsFromAPI(
        null,
        [lng, lat],
        type,
        null,
        null,
        radius
      );
      const formattedPositions = formatPositionResult(apiData);

      return res.json({
        source: "api_only",
        positions: formattedPositions,
      });
    }

    // 其他组合暂不支持
    return res.status(400).json({ error: "不支持的参数组合" });
  } catch (error) {
    console.error("获取位置信息失败:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
}

module.exports = {
  getPositions,
};
