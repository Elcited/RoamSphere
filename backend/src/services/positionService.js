const fetchPositionsFromAPI = require("../utils/fetchPositionsFromAPI");
const { formatPositionResult } = require("../utils/positionsHelpers");
const { classifyModelByType } = require("../utils/classifyHelpers");
const { recordCitiesFromResults } = require("../services/userActivityService");

async function getPositionsByRegionKeyword(keyword, region, radius, userId) {
  const { data: apiData } = await fetchPositionsFromAPI(
    null,
    null,
    null,
    keyword,
    "全国",
    radius
  );

  const formattedPositions = formatPositionResult(apiData);

  if (userId && formattedPositions.length > 0) {
    await recordCitiesFromResults(userId, formattedPositions);
  }

  const results = [];

  for (const position of formattedPositions) {
    const Model = classifyModelByType(position.type);

    if (Model) {
      const exists = await Model.findOne({ position_id: position.position_id });
      if (!exists) {
        await Model.create(position);
      }
    }

    results.push(position);
  }

  return {
    source: "api+db_check",
    positions: results,
  };
}

async function getPositionsByLocationType([lng, lat], type, radius, userId) {
  const { data: apiData } = await fetchPositionsFromAPI(
    null,
    [lng, lat],
    type,
    null,
    null,
    radius
  );

  const formattedPositions = formatPositionResult(apiData);

  if (userId && formattedPositions.length > 0) {
    await recordCitiesFromResults(userId, formattedPositions);
  }

  return {
    source: "api_only",
    positions: formattedPositions,
  };
}

module.exports = {
  getPositionsByRegionKeyword,
  getPositionsByLocationType,
};
