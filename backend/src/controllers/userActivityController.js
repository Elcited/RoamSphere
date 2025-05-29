const mongoose = require("mongoose");
const UserActivity = require("../models/userActivityModel");
const Attraction = require("../models/attractionModel");
const Hotel = require("../models/hotelModel");
const { getUserRecommendedCities } = require("../services/userActivityService");
const { defaultRecommendedCities } = require("../config/defaults");

// 工具函数：确保 userActivity 文档存在
async function ensureUserActivity(userId) {
  let activity = await UserActivity.findOne({ user: userId });
  if (!activity) {
    activity = await UserActivity.create({ user: userId });
  }
  return activity;
}

// 浏览景点
exports.recordViewedAttraction = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const activity = await ensureUserActivity(userId);

    await UserActivity.updateOne(
      { user: userId },
      {
        $addToSet: {
          viewedAttractions: {
            attraction: data.id,
            viewedAt: new Date(),
          },
        },
        $set: { updated_at: new Date() },
      }
    );

    res.status(200).json({ message: "Viewed attraction recorded" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to record viewed attraction", error: err });
  }
};

// 收藏任意类型的 POI（景点/酒店/position）
exports.recordFavoritedPOI = async (req, res) => {
  try {
    const { poiId, poiType, isInternal, name } = req.body;
    const userId = req.user.id;

    await ensureUserActivity(userId);

    await UserActivity.updateOne(
      { user: userId },
      {
        $addToSet: {
          favoritedPOIs: {
            poiId: String(poiId), // 确保统一处理为字符串
            poiType, // 比如 "Attraction"、"Hotel"、"ExternalPOI"
            isInternal: !!isInternal,
            name, // 可以加个名字字段，后期分析或展示更清晰
            favoritedAt: new Date(),
          },
        },
        $set: { updated_at: new Date() },
      }
    );

    res.status(200).json({ message: "Favorited POI recorded" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to record favorited POI",
      error: err,
    });
  }
};

// 浏览酒店
exports.recordViewedHotel = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    await ensureUserActivity(userId);

    await UserActivity.updateOne(
      { user: userId },
      {
        $addToSet: {
          viewedHotels: {
            hotel: data.id,
            viewedAt: new Date(),
          },
        },
        $set: { updated_at: new Date() },
      }
    );

    res.status(200).json({ message: "Viewed hotel recorded" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to record viewed hotel", error: err });
  }
};

// 搜索其他类型POI（不入库的POI，比如购物/饮食）
exports.recordSearchedOtherPOI = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    await ensureUserActivity(userId);

    await UserActivity.updateOne(
      { user: userId },
      {
        $push: {
          searchedOtherPOIs: {
            keyword: data.keyword,
            poiType: data.poiType,
            searchedAt: new Date(),
          },
        },
        $set: { updated_at: new Date() },
      }
    );

    res.status(200).json({ message: "Searched other POI recorded" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to record searched POI", error: err });
  }
};

exports.getFavoritePOITrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const past30 = new Date(today);
    past30.setDate(today.getDate() - 29);
    past30.setHours(0, 0, 0, 0);

    const trend = await UserActivity.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$favoritedPOIs" },
      {
        $match: {
          "favoritedPOIs.favoritedAt": { $gte: past30, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$favoritedPOIs.favoritedAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ trend });
  } catch (err) {
    console.error("getFavoritePOITrend error:", err);
    res
      .status(500)
      .json({ message: "Failed to get favorite trend", error: err.message });
  }
};

exports.getViewedAttractions = async (req, res) => {
  try {
    const matchStage = req.user
      ? { user: new mongoose.Types.ObjectId(req.user.id) }
      : {};

    const result = await UserActivity.aggregate([
      ...(req.user
        ? [{ $match: { user: new mongoose.Types.ObjectId(req.user.id) } }]
        : []),
      { $unwind: "$viewedAttractions" },
      {
        $lookup: {
          from: "attractions", // 集合名
          localField: "viewedAttractions.attraction",
          foreignField: "_id",
          as: "attractionInfo",
        },
      },
      { $unwind: "$attractionInfo" },
      {
        $group: {
          _id: "$viewedAttractions.attraction",
          name: { $first: "$attractionInfo.name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: 1,
          count: 1,
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ data: result });
  } catch (err) {
    console.error("getViewedAttractions error:", err);
    res.status(500).json({
      message: "Failed to get viewed attractions",
      error: err.message,
    });
  }
};

exports.getPOISearchRatio = async (req, res) => {
  try {
    const matchStage = req.user
      ? { user: new mongoose.Types.ObjectId(req.user.id) }
      : {};

    const result = await UserActivity.aggregate([
      ...(req.user ? [{ $match: matchStage }] : []),
      { $unwind: "$searchedOtherPOIs" },
      {
        $group: {
          _id: "$searchedOtherPOIs.poiType",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ data: result });
  } catch (err) {
    console.error("getPOISearchRatio error:", err);
    res
      .status(500)
      .json({ message: "Failed to get POI search ratio", error: err.message });
  }
};

exports.getUserBrowsedData = async (req, res) => {
  try {
    const userId = req.user._id; // 假设身份验证中间件已经拿到用户 id

    // 找到当前用户的活动记录（因为你模型上 user 字段是 unique，理论上只有一条）
    const activity = await UserActivity.findOne({ user: userId })
      .populate("viewedAttractions.attraction", "name location") // 只查名字和位置，按需改
      .populate("viewedHotels.hotel", "name address");

    if (!activity) {
      return res.status(200).json({
        attractions: [],
        hotels: [],
        cities: [],
      });
    }

    // 去重函数，按 ObjectId 去重
    const uniqueByObjectId = (arr, key) => {
      const map = new Map();
      arr.forEach(item => {
        const id = item[key]?._id?.toString();
        if (id && !map.has(id)) {
          map.set(id, item);
        }
      });
      return Array.from(map.values());
    };

    // 去重城市（字符串去重）
    const uniqueCities = Array.from(
      new Set(activity.searchedCities.map(c => c.city))
    );

    const uniqueAttractions = uniqueByObjectId(
      activity.viewedAttractions,
      "attraction"
    );
    const uniqueHotels = uniqueByObjectId(activity.viewedHotels, "hotel");

    // 格式化返回，只要对象和一些字段
    res.status(200).json({
      attractions: uniqueAttractions.map(item => ({
        _id: item.attraction._id,
        name: item.attraction.name,
      })),
      hotels: uniqueHotels.map(item => ({
        _id: item.hotel._id,
        name: item.hotel.name,
      })),
      cities: uniqueCities,
    });
  } catch (error) {
    console.error("getUserBrowsedData error:", error);
    res.status(500).json({ message: "服务器错误" });
  }
};

exports.getUserRecommendedCitiesHandler = async (req, res) => {
  try {
    // 如果未登录，返回兜底城市
    if (!req.user) {
      return res.json({ success: true, data: defaultRecommendedCities });
    }

    const userId = req.user._id;
    const cities = await getUserRecommendedCities(userId);
    res.json({ success: true, data: cities });
  } catch (err) {
    console.error("推荐城市接口错误:", err);
    res
      .status(500)
      .json({ success: false, message: "获取推荐城市失败，请稍后再试" });
  }
};

// 平台收藏POI趋势：统计最近30天每天的收藏数（全平台）
exports.getPlatformFavoritePOITrend = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const past30 = new Date(today);
    past30.setDate(today.getDate() - 29);
    past30.setHours(0, 0, 0, 0);

    const trend = await UserActivity.aggregate([
      { $unwind: "$favoritedPOIs" },
      {
        $match: {
          "favoritedPOIs.favoritedAt": { $gte: past30, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$favoritedPOIs.favoritedAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ trend });
  } catch (err) {
    console.error("getPlatformFavoritePOITrend error:", err);
    res.status(500).json({ message: "统计收藏趋势失败", error: err.message });
  }
};

// 平台浏览景点统计：统计所有用户浏览的景点数（按景点分组统计浏览次数）
exports.getPlatformViewedAttractionsStats = async (req, res) => {
  try {
    const stats = await UserActivity.aggregate([
      { $unwind: "$viewedAttractions" },
      {
        $group: {
          _id: "$viewedAttractions.attraction", // 景点ID
          count: { $sum: 1 }, // 浏览次数
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 }, // 返回前20热门景点
      {
        $lookup: {
          from: "attractions",
          localField: "_id",
          foreignField: "_id",
          as: "attractionInfo",
        },
      },
      {
        $unwind: {
          path: "$attractionInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          name: "$attractionInfo.name",
          location: "$attractionInfo.location",
        },
      },
    ]);

    res.status(200).json({ data: stats });
  } catch (err) {
    console.error("getPlatformViewedAttractionsStats error:", err);
    res.status(500).json({ message: "统计浏览景点失败", error: err });
  }
};

// 平台统计：其他类型 POI 搜索情况
exports.getPlatformSearchedOtherPOIStats = async (req, res) => {
  try {
    const stats = await UserActivity.aggregate([
      { $unwind: "$searchedOtherPOIs" }, // 拆分子数组
      {
        $group: {
          _id: "$searchedOtherPOIs.poiType", // 按类型聚合
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      data: stats.map(item => ({
        type: item._id,
        count: item.count,
      })),
    });
  } catch (err) {
    console.error("平台统计查询失败", err);
    res.status(500).json({ message: "统计失败", error: err });
  }
};
