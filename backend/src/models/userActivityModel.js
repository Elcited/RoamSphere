const { Schema, model } = require("mongoose");

const userActivitySchema = new Schema({
  user: { type: ObjectId, ref: "User", required: true },
  viewedAttractions: [
    //用户浏览的景点
    {
      type: ObjectId,
      ref: "Attraction",
    },
  ],
  favoritedAttractions: [
    //用户收藏的景点
    { type: ObjectId, ref: "Attraction" },
  ],
  searchedCities: [String], //用户搜索的城市
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const userActivityModel = model("UserActivity", userActivitySchema);

module.exports = userActivityModel;
