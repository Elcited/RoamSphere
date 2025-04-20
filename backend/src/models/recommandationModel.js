const { Schema, model } = require("mongoose");

const recommandationSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    require: true,
  },
  recommanded_attractions: [
    {
      type: ObjectId,
      ref: "Attraction",
      require: true,
    },
  ],
  algorithm: { type: String, enum: ["collaborative", "popular", "hybrid"] }, // 推荐算法类型
  created_at: { type: Date, default: Date.now }, // 生成时间
});

const recommandationModel = model("Recommandation", recommandationSchema);

module.exports = recommandationModel;
