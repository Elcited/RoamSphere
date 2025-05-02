const { Schema, model } = require("mongoose");

const drivingRouteSchema = new Schema(
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
    taxi_cost: { type: Number },
    distance: { type: Number },
    duration: { type: Number },
    totalTolls: { type: Number },
    traffic_lights: { type: Number },
    travel_mode: { type: String },
    route_hash: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const DrivingRoute = model("drivingRoute", drivingRouteSchema);

module.exports = DrivingRoute;
