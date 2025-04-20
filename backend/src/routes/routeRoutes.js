const express = require("express");
const { getRoutes } = require("../controllers/routesController");

const router = express.Router();

router.route("/get_routes").get(getRoutes);

// router.route("/save_routes").post(saveRoutes);

module.exports = router;
