const UserActivity = require("../models/userActivityModel");

/**
 * 从任意结果中提取 cityname，并记录
 * @param {ObjectId} userId - 用户ID
 * @param {Array<Object>} results - 带 cityname 字段的对象数组
 */
async function recordCitiesFromResults(userId, results) {
  if (!userId || !Array.isArray(results)) return;

  const citynames = results.map(r => r.cityname).filter(Boolean);
  const uniqueCities = [...new Set(citynames)];

  if (uniqueCities.length === 0) return;

  const updates = uniqueCities.map(city => ({
    city,
    searchedAt: new Date(),
  }));

  await UserActivity.findOneAndUpdate(
    { user: userId },
    {
      $addToSet: {
        searchedCities: { $each: updates },
      },
    },
    { upsert: true, new: true }
  );
}

// 根据用户ID推荐热门城市
async function getUserRecommendedCities(userId) {
  const activity = await UserActivity.findOne({ user: userId });

  if (!activity) return [];

  // 从 searchedCities 统计搜索最多的城市
  const cityCountMap = {};
  activity.searchedCities.forEach(({ city }) => {
    if (city) cityCountMap[city] = (cityCountMap[city] || 0) + 1;
  });

  // 从 viewedAttractions 和 viewedHotels 反推城市
  // 需要先populate景点和酒店的城市字段
  const populatedActivity = await UserActivity.findOne({ user: userId })
    .populate({
      path: "viewedAttractions.attraction",
      select: "city name",
    })
    .populate({
      path: "viewedHotels.hotel",
      select: "city name",
    });

  populatedActivity.viewedAttractions.forEach(({ attraction }) => {
    if (attraction?.city) {
      cityCountMap[attraction.city] = (cityCountMap[attraction.city] || 0) + 1;
    }
  });
  populatedActivity.viewedHotels.forEach(({ hotel }) => {
    if (hotel?.city) {
      cityCountMap[hotel.city] = (cityCountMap[hotel.city] || 0) + 1;
    }
  });

  // 按频次排序
  const sortedCities = Object.entries(cityCountMap)
    .sort((a, b) => b[1] - a[1])
    .map(([city]) => city);

  // 只返回top 5
  return sortedCities.slice(0, 5);
}

module.exports = {
  recordCitiesFromResults,
  getUserRecommendedCities,
};
