const express = require("express");
const router = express.Router();
const userActivityController = require("../controllers/userActivityController");
const { optionalAuth } = require("../controllers/authController");

/* 登录之后才能记录 */
router.use(optionalAuth);

router.post("/view-attraction", userActivityController.recordViewedAttraction);
router.post("/favorite-poi", userActivityController.recordFavoritedPOI);
router.post("/view-hotel", userActivityController.recordViewedHotel);
router.post("/search-other-poi", userActivityController.recordSearchedOtherPOI);
router.get("/favorite-poi-trend", userActivityController.getFavoritePOITrend);
router.get(
  "/viewed-attractions-stats",
  userActivityController.getViewedAttractions
);
router.get(
  "/searched-other-poi-stats",
  userActivityController.getPOISearchRatio
);

router.get("/get-browsed-data", userActivityController.getUserBrowsedData);
router.get(
  "/recommend-cities",
  userActivityController.getUserRecommendedCitiesHandler
);

router.get(
  "/stats/favorite-poi-trend/platform",
  userActivityController.getPlatformFavoritePOITrend
);
router.get(
  "/stats/viewed-attractions/platform",
  userActivityController.getPlatformViewedAttractionsStats
);
router.get(
  "/stats/search-other-poi/platform",
  userActivityController.getPlatformSearchedOtherPOIStats
);

module.exports = router;
