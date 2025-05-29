const express = require("express");
const authController = require("../controllers/authController");
const { getPositions } = require("../controllers/positionsController");

const router = express.Router();

router.route("/get_positions").get(authController.optionalAuth, getPositions);

module.exports = router;
