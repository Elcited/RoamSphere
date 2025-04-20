const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  location: {
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    address: String,
  },
  phone: String,
  images: [String],
  created_at: { type: Date, default: Date.now() },
  updated_at: Date,
});

const hotelModel = model("Hotel", hotelSchema);

module.exports = hotelModel;
