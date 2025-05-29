const { Schema, model, Types } = require("mongoose");

const userRecommendationSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // 一个用户一条记录
  },

  recommendedAttractions: [
    {
      attraction: {
        type: Types.ObjectId,
        ref: "Attraction",
      },
      reason: String, // 例如 "based on your search history"
      score: Number, // 推荐打分/优先级（可选）
    },
  ],

  recommendedRoutes: [
    {
      route: {
        type: Types.ObjectId,
        ref: "Route",
      },
      reason: String,
      score: Number,
    },
  ],

  recommendedHotels: [
    {
      hotel: {
        type: Types.ObjectId,
        ref: "Hotel",
      },
      reason: String,
      score: Number,
    },
  ],

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userRecommendationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserRecommendation = model(
  "UserRecommendation",
  userRecommendationSchema
);

module.exports = UserRecommendation;
