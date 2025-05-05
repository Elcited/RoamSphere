import formatDuration from "./formatDuration";
import formatDistance from "./formatDistance";

/**
 * 完整解析公交/地铁路线数据（支持多线路+同步instructions）
 * @param {Array} routes API返回的routes数组
 * @returns {Array} 每个元素为 { polylines, routeInfo }
 */
export default function parseTransitRouteResult(routes = []) {
  return routes.map(route => {
    const transitOptions = route.routeDetail?.transit_options || [];
    const transitPolylines = route.polyline || [];

    const polylines = transitPolylines.map(polyline => ({
      segments: (polyline.segments || []).map(segment => {
        const walkingPolyline = segment.walking?.polyline || null;
        const walkingInstructions = segment.walking?.instructions || [];

        return {
          walking: walkingPolyline
            ? {
                polyline: walkingPolyline,
                instructions: walkingInstructions,
              }
            : null,
          bus: segment.bus?.polyline.map(polyline => polyline) || null,
          subway: segment.subway?.polyline.map(polyline => polyline) || null,
          cityRailway:
            segment.cityRailway?.polyline.map(polyline => polyline) || null,
          railway: segment.railway?.polyline || null,
          taxi: segment.taxi?.polyline || null,
        };
      }),
    }));

    const routeInfo = {
      startLocation: route.routeDetail?.start_location || null,
      endLocation: route.routeDetail?.end_location || null,
      startInfo: route.routeDetail?.startInfo || null,
      endInfo: route.routeDetail?.endInfo || null,
      strategy: route.strategy || null,

      plans: transitOptions.map((option, optionIndex) => {
        const getTransportDetails = (segment, type) => {
          if (!segment[type]?.length) return null;

          return segment[type].map(transport => ({
            name: transport.name || null,
            cost: transport.cost || null,
            distance: formatDistance(transport.distance) || null,
            type: transport.type || null,
            departure_stop: transport.departure_stop || null,
            arrival_stop: transport.arrival_stop || null,
            start_time: transport.start_time || null,
            end_time: transport.end_time || null,
            busTimeTips: transport.bus_time_tips || null,
            busTimeTag: transport.bustimetag || null,
            viaNumbers: transport.via_num || null,
            ...(type === "bus" && {
              viaStops: (transport.via_stops || []).map(s => s),
            }),
          }));
        };

        return {
          transit_fee: option.transit_fee || 0,
          duration: formatDuration(option.duration) || 0,
          distance: formatDistance(option.distance) || 0,
          nightflag: option.nightflag === "1",
          segments: (option.segments || []).map((segment, segmentIndex) => {
            const polylineSegment =
              polylines[optionIndex]?.segments?.[segmentIndex];
            const walkingInstructions =
              polylineSegment?.walking?.instructions || [];

            return {
              walking: segment.walking
                ? {
                    origin: segment.walking.origin || null,
                    destination: segment.walking.destination || null,
                    distance: formatDistance(segment.walking.distance) || 0,
                    duration: formatDuration(segment.walking.duration) || 0,
                    instructions: walkingInstructions,
                  }
                : null,
              bus: getTransportDetails(segment, "bus"),
              subway: getTransportDetails(segment, "subway"),
              cityRailway: getTransportDetails(segment, "cityRailway"),
              railway: getTransportDetails(segment, "railway"),
              taxi: segment.taxi
                ? {
                    distance: formatDistance(segment.taxi.distance) || 0,
                    duration: formatDuration(segment.taxi.duration) || 0,
                  }
                : null,
            };
          }),
        };
      }),
    };

    return { polylines, routeInfo };
  });
}
