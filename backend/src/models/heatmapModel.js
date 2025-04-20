const { Schema, model } = require("mongoose");

const heatmapSchema = new Schema({
  attractionViews: [
    //统计景点访问量
    {
      attraction: { type: mongoose.Schema.Types.ObjectId, ref: "Attractions" },
      viewCount: { type: Number, default: 0 },
    },
  ],

  cityViews: [
    //统计城市查询次数
    {
      city: { type: String, required: true },
      viewCount: { type: Number, default: 0 },
    },
  ],

  routeUsage: [
    //统计路线使用次数
    {
      route: { type: mongoose.Schema.Types.ObjectId, ref: "Routes" },
      usageCount: { type: Number, default: 0 },
    },
  ],

  dailyVisits: [
    //统计每天的访问量
    {
      date: { type: Date, required: true },
      count: { type: Number, default: 0 },
    },
  ],

  created_at: { type: Date, default: Date.now() }, //记录更新时间
});

const heatmapModel = model("Heatmap", heatmapSchema);

module.exports = heatmapModel;
