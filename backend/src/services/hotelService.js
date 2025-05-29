const { formatHotelResult } = require("../utils/hotelsHelpers");
const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const { recordCitiesFromResults } = require("../services/userActivityService");
const Hotel = require("../models/hotelModel");

async function fetchAndSaveHotelsNearLocation([lng, lat], radius, userId) {
  await ensureGeoIndex();

  const existingHotels = await Hotel.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radius,
      },
    },
  }).lean();

  if (existingHotels.length > 0) {
    return {
      source: "database",
      hotels: existingHotels,
    };
  }

  const { data: hotelsDataFromAPI } = await fetchPositionsFromAPI(
    null,
    [lng, lat],
    100000,
    null,
    null,
    radius
  );

  const formattedHotels = formatHotelResult(hotelsDataFromAPI);

  if (userId && formattedHotels.length > 0) {
    await recordCitiesFromResults(userId, formattedHotels);
  }

  const newHotels = await saveHotelsToDB(formattedHotels);
  const allHotels = [...existingHotels, ...newHotels];

  return {
    source: allHotels.length > 0 ? "database+api" : "api",
    hotels: allHotels,
  };
}

async function ensureGeoIndex() {
  const indexes = await Hotel.collection.indexes();
  const hasIndex = indexes.some(idx => idx.key?.location === "2dsphere");
  if (!hasIndex) {
    await Hotel.collection.createIndex({ location: "2dsphere" });
  }
}

async function saveHotelsToDB(hotels) {
  const newHotels = [];

  for (const hotel of hotels) {
    const exists = await Hotel.findOne({ position_id: hotel.position_id });
    if (!exists) {
      newHotels.push(hotel);
    }
  }

  if (newHotels.length > 0) {
    await Hotel.insertMany(newHotels);
  }

  return newHotels;
}

module.exports = {
  fetchAndSaveHotelsNearLocation,
};
