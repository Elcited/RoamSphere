const express = require("express");
const authController = require("../controllers/authController");
const { getRoutes } = require("../controllers/routesController");

const router = express.Router();

router.route("/get_routes").get(authController.optionalAuth, getRoutes);

module.exports = router;
