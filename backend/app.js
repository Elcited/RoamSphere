const express = require("express");
const redisClient = require("./src/utils/redisClient");
const routeRoutes = require("./src/routes/routeRoutes");
const attractionRoutes = require("./src/routes/attractionRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const positionRoutes = require("./src/routes/positionRoutes");

const app = express();

app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/positions", positionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
