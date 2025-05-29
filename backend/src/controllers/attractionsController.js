const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const { formatAttractionResult } = require("../utils/attractionsHelpers");
const { saveAttractionsToDB } = require("../services/attractionService");
const { ensure2DSphereIndex } = require("../utils/mongoHelpers");
const { recordCitiesFromResults } = require("../services/userActivityService");
const Attraction = require("../models/attractionModel");

async function getAttractions(req, res) {
  const { location, radius = 5000 } = req.query;
  if (!location) {
    return res.status(400).json({ error: "缺少经纬度参数！" });
  }

  const [lng, lat] = location.split(",").map(Number);

  try {
    // 确保地理位置索引存在
    await ensure2DSphereIndex(Attraction.collection, "location");

    // 查数据库
    const existingAttractions = await Attraction.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radius,
        },
      },
    }).lean();

    if (existingAttractions.length > 0) {
      return res.json({
        source: "database",
        attractions: existingAttractions,
      });
    }

    // 拉取 API 数据
    const { data: attractionsDataFromAPI } = await fetchPositionsFromAPI(
      null,
      [lng, lat],
      110000,
      null,
      null,
      radius
    );

    const formattedAttractions = formatAttractionResult(attractionsDataFromAPI);

    /* 在用户登录的情况下，对查询结果所在城市进行统计 */
    if (req.user && formattedAttractions.length > 0) {
      await recordCitiesFromResults(req.user._id, formattedAttractions);
    }

    // 保存到 DB
    const newAttractions = await saveAttractionsToDB(formattedAttractions);

    const allAttractions = [...existingAttractions, ...newAttractions];
    res.json({
      source: allAttractions.length > 0 ? "database+api" : "api",
      attractions: allAttractions,
    });
  } catch (error) {
    console.error("获取景点失败:", error);
    res.status(500).json({ error: "服务器错误" });
  }
}

module.exports = { getAttractions };
