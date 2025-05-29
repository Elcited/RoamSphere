const Attraction = require("../models/attractionModel");

async function saveAttractionsToDB(attractions) {
  if (!attractions || attractions.length === 0) return [];

  // 一次性查出已有的 position_id
  const existing = await Attraction.find({
    position_id: { $in: attractions.map(a => a.position_id) },
  }).select("position_id");

  const existingIds = new Set(existing.map(item => item.position_id));

  // 过滤出数据库中还没有的
  const newAttractions = attractions.filter(
    a => !existingIds.has(a.position_id)
  );

  if (newAttractions.length > 0) {
    // 插入并返回插入后的文档（含 _id）
    const inserted = await Attraction.insertMany(newAttractions);
    return inserted;
  }

  return [];
}

module.exports = {
  saveAttractionsToDB,
};
