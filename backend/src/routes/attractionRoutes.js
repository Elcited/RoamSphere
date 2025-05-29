const express = require("express");
const { getAttractions } = require("../controllers/attractionsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/get_attractions")
  .get(authController.optionalAuth, getAttractions);

module.exports = router;
