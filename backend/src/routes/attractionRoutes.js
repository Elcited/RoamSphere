const express = require("express");
const { getAttractions } = require("../controllers/attractionsController");

const router = express.Router();

router.route("/get_attractions").get(getAttractions);

module.exports = router;
