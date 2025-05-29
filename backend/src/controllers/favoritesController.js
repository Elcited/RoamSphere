const Favorite = require("../models/favoriteModel");
const Attraction = require("../models/attractionModel");
const Hotel = require("../models/hotelModel");
const mongoose = require("mongoose");

/**
 * 收藏 POI，支持 Attraction / Hotel / ExternalPOI
 */
exports.favoritePOI = async (req, res) => {
  try {
    const { poiId, refType, poiData } = req.body;
    console.log(poiId, refType, poiData);
    const userId = req.user?.id;

    if (!["Attraction", "Hotel", "ExternalPOI"].includes(refType)) {
      return res.status(400).json({ message: "Invalid refType" });
    }

    const favoriteDoc = {
      user: userId,
      refType,
      addedAt: new Date(),
    };

    if (refType === "ExternalPOI") {
      if (!poiId || !poiData) {
        return res.status(400).json({ message: "Missing ExternalPOI data" });
      }

      // 不入库，直接存在 Favorite 文档中
      favoriteDoc.externalPOI = {
        poiId,
        name: poiData.name,
        address: poiData.address,
        location: {
          type: "Point",
          coordinates: [
            poiData.location?.lng || poiData.location?.coordinates?.[0],
            poiData.location?.lat || poiData.location?.coordinates?.[1],
          ],
        },
        type: poiData.type,
        business: poiData.business,
      };
    } else {
      favoriteDoc.refId = poiId;
    }

    await Favorite.create(favoriteDoc);

    res.status(201).json({ message: "POI favorited successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "POI already favorited" });
    }
    res.status(500).json({ message: "Failed to favorite POI", error: err });
    console.error("Favorite save failed:", err.message, err.errors);
  }
};

/**
 * 取消收藏
 */
exports.unfavoritePOI = async (req, res) => {
  try {
    const { poiId, refType } = req.body;
    const userId = req.user.id;

    const condition =
      refType === "ExternalPOI"
        ? { user: userId, refType, "externalPOI.poiId": poiId }
        : { user: userId, refType, refId: new mongoose.Types.ObjectId(poiId) };

    console.log("condition", condition);

    const result = await Favorite.findOneAndDelete(condition);

    if (!result) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Unfavorited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unfavorite POI", error: err });
    console.error(err.message, err.errors);
  }
};

/**
 * 获取用户所有收藏
 */
exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ user: userId })
      .populate({
        path: "refId",
        select: "-__v",
      })
      .lean();

    const formatted = favorites.map(fav => {
      if (fav.refType === "ExternalPOI") {
        return {
          _id: fav._id,
          refType: fav.refType,
          addedAt: fav.addedAt,
          ...fav.externalPOI,
        };
      }

      return {
        _id: fav._id,
        refType: fav.refType,
        addedAt: fav.addedAt,
        ...fav.refId, // 已通过 populate 展开
      };
    });

    res.status(200).json({ favorites: formatted });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch favorites", error: err });
  }
};
