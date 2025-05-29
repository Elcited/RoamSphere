const { Schema, model, Types } = require("mongoose");

const externalPOISchema = new Schema(
  {
    poiId: String,
    name: String,
    address: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: val => val.length === 2,
          message: "Coordinates must be [lng, lat]",
        },
      },
    },
    type: String,
    business: {
      keytag: String,
      rectag: String,
      rating: String,
      cost: String,
      tag: String,
    },
  },
  { _id: false } // 不生成 _id 字段
);

const favoriteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  refType: {
    type: String,
    enum: ["Attraction", "Hotel", "ExternalPOI"],
    required: true,
  },
  refId: {
    type: Types.ObjectId,
    refPath: "refType",
  },
  externalPOI: externalPOISchema,
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// 复合索引
favoriteSchema.index(
  { user: 1, refType: 1, refId: 1 },
  { unique: true, partialFilterExpression: { refId: { $exists: true } } }
);
favoriteSchema.index(
  { user: 1, refType: 1, "externalPOI.poiId": 1 },
  {
    unique: true,
    partialFilterExpression: { "externalPOI.poiId": { $exists: true } },
  }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
