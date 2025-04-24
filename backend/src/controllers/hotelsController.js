const { formatHotelResult } = require("../utils/hotelsHelpers");
const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const Hotel = require("../models/hotelModel");

async function getHotels(req, res) {
  const { location, radius = 5000 } = req.query;
  if (!location) {
    return res.status(400).json({ error: "缺少经纬度参数！" });
  }

  const [lng, lat] = location.split(",").map(Number);

  try {
    const indexes = await Hotel.collection.indexes();
    if (!indexes.some(idx => idx.key?.location === "2dsphere")) {
      await Hotel.collection.createIndex({ location: "2dsphere" });
    }

    const existingHotels = await Hotel.find({
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

    if (existingHotels.length > 0) {
      return res.json({
        source: "database",
        hotels: existingHotels,
      });
    }

    const { data: hotelsDataFromAPI } = await fetchPositionsFromAPI(
      [lng, lat],
      100000
    );
    const formattedHotels = formatHotelResult(hotelsDataFromAPI);

    const newHotels = [];
    for (const hotel of formattedHotels) {
      const exists = await Hotel.findOne({
        position_id: hotel.position_id,
      });
      if (!exists) {
        newHotels.push(hotel);
      }
    }

    if (newHotels.length > 0) {
      await Hotel.insertMany(newHotels);
    }

    const allHotels = [...existingHotels, ...newHotels];
    res.json({
      source: allHotels.length > 0 ? "database+api" : "api",
      hotels: allHotels,
    });
  } catch (error) {
    console.error("获取酒店失败:", error);
    res.status(500).json({ error: "服务器错误" });
  }
}

module.exports = {
  getHotels,
};
