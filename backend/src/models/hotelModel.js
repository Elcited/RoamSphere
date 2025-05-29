const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
  position_id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  citycode: { type: String },
  adcode: { type: String },
  pname: { type: String },
  cityname: { type: String },
  adname: { type: String },
  type: { type: String },
  typecode: { type: String },
  business: {
    keytag: { type: String },
    rating: { type: String },
    business_area: { type: String },
    opentime_today: { type: String },
    opentime_week: { type: String },
    rectag: { type: String },
    tel: { type: String },
    cost: { type: String },
    tag: { type: String },
  },
  navi: {
    entr_location: { type: [Number] },
    gridcode: { type: String },
  },
  indoor: {
    indoor_map: { type: String },
  },
  photos: [
    {
      title: { type: String },
      url: { type: String },
    },
  ],
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
