const Attraction = require("../models/attractionModel");
const Hotel = require("../models/hotelModel");

function classifyModelByType(type = "") {
  if (type.includes("风景名胜") || type.includes("旅游景点")) {
    return Attraction;
  }
  if (type.includes("住宿服务") || type.includes("宾馆")) {
    return Hotel;
  }
  return null;
}

module.exports = { classifyModelByType };
