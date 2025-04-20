export default function getExtraInfo(
  result,
  startLocationFromStore,
  endLocationFromStore
) {
  console.log(result.origin, result.destination);
  const start = [result.origin.lng, result.origin.lat];
  const end = [result.destination.lng, result.destination.lat];

  const steps = result.routes[0].steps;

  const startStepPath = steps[0].path;
  const startStepLng = startStepPath[0].lng;
  const startStepLat = startStepPath[0].lat;

  // 提取最后一个 step 的最后一个坐标（最终路径点）
  const lastStepPath = steps[steps.length - 1].path;
  console.log(lastStepPath);
  const endStepLng = [lastStepPath.length - 1].lng;
  const endStepLat = [lastStepPath.length - 1].lat;

  return {
    start,
    end,
    start_location: {
      name: startLocationFromStore,
      coordinates: [startStepLng, startStepLat],
    },
    end_location: {
      name: endLocationFromStore,
      coordinates: [endStepLng, endStepLat],
    },
  };
}
