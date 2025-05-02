const { Schema, model } = require("mongoose");

const cyclingRouteSchema = new Schema(
  {
    start_location: {
      name: { type: String },
      coordinates: { type: [Number] },
    },
    end_location: {
      name: { type: String },
      coordinates: { type: [Number] },
    },
    startInfo: { type: Schema.Types.Mixed },
    endInfo: { type: Schema.Types.Mixed },
    distance: { type: Number },
    duration: { type: Number },
    travel_mode: { type: String },
    route_hash: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const CyclingRoute = model("cyclingRoute", cyclingRouteSchema);

module.exports = CyclingRoute;
