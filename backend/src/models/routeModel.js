const { Schema, model } = require("mongoose");

const coordinateSchema = new Schema(
  {
    name: String,
    coordinates: [Number],
  },
  { _id: false }
);

const routeSchema = new Schema({
  // user_id: { type: Schema.Types.ObjectId, ref: "User" },
  start_location: coordinateSchema,
  end_location: coordinateSchema,
  startInfo: {
    type: Object,
  },
  endInfo: {
    type: Object,
  },
  taxi_costs: {
    type: Number,
    default: 0,
  },
  duration: Number,
  distance: Number,
  totalTolls: Number,
  travel_mode: {
    type: String,
    enum: ["driving", "transit", "walking", "cycling"],
  },
  traffic_lights: {
    type: Number,
  },
  source: {
    type: String,
    enum: ["api", "cached"],
    default: "api",
  },
  route_hash: { type: String, index: true },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
});

const Route = model("Route", routeSchema);

module.exports = Route;
