const express = require("express");

const { getPositions } = require("../controllers/positionsController");

const router = express.Router();

router.route("/get_positions").get(getPositions);

module.exports = router;
