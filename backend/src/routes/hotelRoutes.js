const express = require("express");

const router = express.Router();

const { getHotels } = require("../controllers/hotelsController");

router.route("/get_hotels").get(getHotels);

module.exports = router;
