const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const { getHotels } = require("../controllers/hotelsController");

router.route("/get_hotels").get(authController.optionalAuth, getHotels);

module.exports = router;
