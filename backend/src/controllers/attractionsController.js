const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const { formatAttractionResult } = require("../utils/attractionsHelpers");
const Attraction = require("../models/attractionModel");

async function getAttractions(req, res) {
  const { location, radius = 5000 } = req.query;
  if (!location) {
    return res.status(400).json({ error: "缺少经纬度参数！" });
  }

  const [lng, lat] = location.split(",").map(Number);

  try {
    const indexes = await Attraction.collection.indexes();
    if (!indexes.some(idx => idx.key?.location === "2dsphere")) {
      await Attraction.collection.createIndex({ location: "2dsphere" });
    }

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

    const { data: attractionsDataFromAPI } = await fetchPositionsFromAPI(
      null,
      [lng, lat],
      110000,
      null,
      null,
      radius
    );
    const formattedAttractions = formatAttractionResult(attractionsDataFromAPI);

    const newAttractions = [];
    for (const attraction of formattedAttractions) {
      const exists = await Attraction.findOne({
        position_id: attraction.position_id,
      });
      if (!exists) {
        newAttractions.push(attraction);
      }
    }

    if (newAttractions.length > 0) {
      await Attraction.insertMany(newAttractions);
    }

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
