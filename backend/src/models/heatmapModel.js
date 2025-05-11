const { Schema, model } = require("mongoose");

const heatmapSchema = new Schema({
  attractionViews: [
    {
      attraction: { type: mongoose.Schema.Types.ObjectId, ref: "Attractions" },
      viewCount: { type: Number, default: 0 },
    },
  ],

  cityViews: [
    {
      city: { type: String, required: true },
      viewCount: { type: Number, default: 0 },
    },
  ],

  routeUsage: [
    {
      route: { type: mongoose.Schema.Types.ObjectId, ref: "Routes" },
      usageCount: { type: Number, default: 0 },
    },
  ],

  dailyVisits: [
    {
      date: { type: Date, required: true },
      count: { type: Number, default: 0 },
    },
  ],

  created_at: { type: Date, default: Date.now() },
});

const heatmapModel = model("Heatmap", heatmapSchema);

module.exports = heatmapModel;
