const { Schema, model, Types } = require("mongoose");

const userActivitySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  /* 用户浏览过的景点 */
  viewedAttractions: [
    {
      attraction: { type: Types.ObjectId, ref: "Attraction" },
      name: { type: String },
      viewedAt: { type: Date, default: Date.now },
    },
  ],

  /* 收藏景点，带收藏时间（更好统计） */
  favoritedPOIs: [
    {
      poiId: { type: String, require: true },
      poiType: { type: String },
      isInternal: { type: Boolean },
      name: { type: String },
      favoritedAt: { type: Date, default: Date.now },
    },
  ],

  /* 用户浏览过的酒店 */
  viewedHotels: [
    {
      hotel: { type: Types.ObjectId, ref: "Hotel" },
      viewedAt: { type: Date, default: Date.now },
    },
  ],

  /* 搜索城市（用来分析兴趣地） */
  searchedCities: [
    {
      city: { type: String },
      searchedAt: { type: Date, default: Date.now },
    },
  ],

  /* 搜索的非景点/酒店类 POI，关键词 + 类型 */
  searchedOtherPOIs: [
    {
      keyword: { type: String }, // 搜索关键词
      poiType: { type: String }, // 如 "shopping", "food", "park" 等
      searchedAt: { type: Date, default: Date.now },
    },
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userActivitySchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const UserActivity = model("UserActivity", userActivitySchema);

module.exports = UserActivity;
