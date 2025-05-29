const express = require("express");
const favoritesController = require("../controllers/favoritesController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

// GET /api/favorites → 获取所有收藏
router
  .route("/")
  .get(favoritesController.getUserFavorites)

  // POST /api/favorites → 添加收藏
  .post(favoritesController.favoritePOI)

  // DELETE /api/favorites → 取消收藏
  .delete(favoritesController.unfavoritePOI);

module.exports = router;
