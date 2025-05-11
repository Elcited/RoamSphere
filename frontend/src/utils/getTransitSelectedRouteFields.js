export default function getTransitSelectedRouteFields(
  routeData,
  selectedStrategyIndex,
  selectedRouteIndex
) {
  const routeInfo = routeData?.routesInfo?.[selectedStrategyIndex];

  if (
    !routeInfo ||
    !Array.isArray(routeInfo.plans) ||
    selectedRouteIndex == null ||
    selectedRouteIndex >= routeInfo.plans.length
  ) {
    return {
      startLocation: undefined,
      startInfo: undefined,
      endLocation: undefined,
      endInfo: undefined,
      distance: undefined,
      duration: undefined,
      nightflag: undefined,
      transitFee: undefined,
      transitSteps: undefined,
    };
  }

  const { startLocation, startInfo, endLocation, endInfo, plans } = routeInfo;
  const plan = plans[selectedRouteIndex];

  const distance = plan.distance;
  const duration = plan.duration;
  const nightflag = plan.nightflag;
  const transitFee = plan.transit_fee;

  const transitSteps = plan.segments.map(segment => {
    const extractBusLikeInfo = (transport = []) =>
      transport.map(item => {
        const type = item.type;
        return {
          type,
          name: item.name,
          distance: item.distance,
          duration: item.cost?.duration,
          startTime: item.start_time === null ? "24小时开放" : item.start_time,
          endTime: item.end_time === null ? "24小时开放" : item.end_time,
          arrivalStop: item.arrival_stop,
          departureStop: item.departure_stop,
          viaNumbers: item.viaNumbers,
          viaStops: item.viaStops || [],
          busTimeTag: item.busTimeTag,
          busTimeTips: item.busTimeTips,
        };
      });

    return {
      walking: segment.walking
        ? {
            origin: segment.walking.origin,
            destination: segment.walking.destination,
            duration: segment.walking.duration,
            distance: segment.walking.distance,
            instructions: segment.walking.instructions,
          }
        : null,
      bus: segment.bus ? extractBusLikeInfo(segment.bus) : [],
      subway: segment.subway ? extractBusLikeInfo(segment.subway) : [],
      cityRailway: segment.cityRailway
        ? extractBusLikeInfo(segment.cityRailway)
        : [],
      railway: segment.railway ?? null,
      taxi: segment.taxi ?? null,
    };
  });

  return {
    startLocation,
    startInfo,
    endLocation,
    endInfo,
    distance,
    duration,
    nightflag,
    transitFee,
    transitSteps,
  };
}
