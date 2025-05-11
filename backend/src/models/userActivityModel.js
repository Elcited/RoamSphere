const { Schema, model } = require("mongoose");

const userActivitySchema = new Schema({
  user: { type: ObjectId, ref: "User", required: true },
  viewedAttractions: [
    {
      type: ObjectId,
      ref: "Attraction",
    },
  ],
  favoritedAttractions: [{ type: ObjectId, ref: "Attraction" }],
  searchedCities: [String],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const userActivityModel = model("UserActivity", userActivitySchema);

module.exports = userActivityModel;
