const { getRoutesData } = require("../services/routeService");

const getRoutes = async (req, res) => {
  const {
    strategy,
    mode,
    startName,
    startLng,
    startLat,
    endName,
    endLng,
    endLat,
  } = req.query;

  const userId = req?.user?.id;

  try {
    const data = await getRoutesData({
      strategy,
      mode,
      startName,
      startLng,
      startLat,
      endName,
      endLng,
      endLat,
      userId,
    });

    res.json({ routes: data });
  } catch (error) {
    console.error("路线获取失败", error);
    res.status(500).json({ message: "路线查询出错" });
  }
};

module.exports = { getRoutes };
