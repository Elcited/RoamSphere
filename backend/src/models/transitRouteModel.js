const { Schema, model } = require("mongoose");

// 停靠站点，供bus、subway共用
const stopSchema = new Schema(
  {
    name: { type: String },
    id: { type: String },
    location: { type: [Number] },
    entrance: {
      name: String,
      location: { type: [Number] },
    }, // 只有 subway 用
    exit: {
      name: String,
      location: { type: [Number] },
    }, // 只有 subway 用
  },
  { _id: false }
);

// 中途经过的站点
const viaStopSchema = new Schema(
  {
    name: { type: String },
    id: { type: String },
    location: { type: [Number] },
  },
  { _id: false }
);

// 步行段
const walkingSchema = new Schema(
  {
    origin: { type: [String] },
    destination: { type: [String] },
    distance: { type: Number },
    duration: { type: Number },
  },
  { _id: false }
);

// 公交线路段
const busSchema = new Schema(
  {
    departure_stop: stopSchema,
    arrival_stop: stopSchema,
    name: { type: String },
    id: { type: String },
    type: { type: String },
    distance: { type: Number },
    cost: {
      duration: { type: Number },
    },
    bus_time_tips: { type: String },
    bustimetag: {
      type: Number,
    } /* 0:普通或默认时间段， 1：首班车, 2:末班车, 3:夜间车 */,
    start_time: { type: Number },
    end_time: { type: Number },
    via_num: { type: Number },
    via_stops: [viaStopSchema],
  },
  { _id: false }
);

// 地铁线路段
const subwaySchema = new Schema(
  {
    departure_stop: stopSchema,
    arrival_stop: stopSchema,
    name: { type: String },
    id: { type: String },
    type: { type: String },
    distance: { type: Number },
    cost: {
      duration: { type: Number },
    },
    bus_time_tips: { type: String },
    bustimetag: {
      type: Number,
    } /* 0:普通或默认时间段， 1：首班车, 2:末班车, 3:夜间车 */,
    start_time: { type: Number },
    end_time: { type: Number },
    via_num: { type: Number },
    via_stops: [viaStopSchema],
  },
  { _id: false }
);

// 城际铁轨段（cityRailway）
const cityRailwaySchema = new Schema(
  {
    departure_stop: stopSchema,
    arrival_stop: stopSchema,
    name: { type: String },
    id: { type: String },
    type: { type: String },
    distance: { type: Number },
    cost: {
      duration: { type: Number },
    },
    bus_time_tips: { type: String },
    bustimetag: {
      type: Number,
    } /* 0:普通或默认时间段， 1：首班车, 2:末班车, 3:夜间车 */,
    start_time: { type: Number },
    end_time: { type: Number },
    via_num: { type: Number },
    via_stops: [viaStopSchema],
  },
  { _id: false }
);

// 铁路段（railway）
const railwaySchema = new Schema(
  {
    id: { type: String },
    duration: { type: Number },
    name: { type: String },
    trip: { type: String },
    distance: { type: Number },
    type: { type: String },
    departure_stop: {
      name: { type: String },
      id: { type: String },
      location: { type: [Number] },
      adcode: { type: String },
      departure_time: { type: String },
      isOriginStop: { type: Boolean },
    },
    arrival_stop: {
      name: { type: String },
      id: { type: String },
      location: { type: [Number] },
      adcode: { type: String },
      arrival_time: { type: String },
      isFinalStop: { type: Boolean },
    },
    railway_spaces: [
      {
        seat_type: { type: String },
        seat_name: { type: String },
        price: { type: Number },
      },
    ],
  },
  { _id: false }
);

// 出租车段（taxi）
const taxiSchema = new Schema(
  {
    distance: { type: Number },
    price: { type: Number },
    drivetime: { type: Number },
    startpoint: { type: [Number] },
    startname: { type: String },
    endpoint: { type: [Number] },
    endname: { type: String },
  },
  { _id: false }
);

// 单个segment
const segmentSchema = new Schema(
  {
    walking: { type: walkingSchema, required: false },
    bus: { type: [busSchema], required: false },
    subway: { type: [subwaySchema], required: false },
    cityRailway: { type: [cityRailwaySchema], required: false },
    railway: { type: railwaySchema, required: false },
    taxi: { type: taxiSchema, required: false },
  },
  { _id: false }
);

// 单个换乘方案
const transitOptionSchema = new Schema(
  {
    duration: { type: Number },
    transit_fee: { type: Number },
    distance: { type: Number },
    walking_distance: { type: Number },
    nightflag: { type: Number },
    segments: [segmentSchema],
  },
  { _id: false }
);

// 顶层route表
const transitRouteSchema = new Schema(
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
    travel_mode: { type: String },
    route_hash: {
      type: String,
      required: true,
      unique: true,
    },
    transit_options: [transitOptionSchema],
  },
  { timestamps: true }
);

const TransitRoute = model("transitRoute", transitRouteSchema);

module.exports = TransitRoute;
