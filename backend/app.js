const express = require("express");
const redisClient = require("./src/utils/redisClient");
const routeRoutes = require("./src/routes/routeRoutes");
const attractionRoutes = require("./src/routes/attractionRoutes");

const app = express();

app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/attractions", attractionRoutes);

module.exports = app;
