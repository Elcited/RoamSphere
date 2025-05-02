export default function parseTransitRouteResult(routes) {
  return routes.map(route => {
    const strategy = route.strategy;
    const polyline = route.polyline;
    const routeDetail = route.routeDetail;

    const startLocation = routeDetail?.start_location || {};
    const endLocation = routeDetail?.end_location || {};
    const startInfo = {
      country:
        routeDetail?.startInfo?.regeocode?.addressComponent?.country || "",
      province:
        routeDetail?.startInfo?.regeocode?.addressComponent?.province || "",
      city: routeDetail?.startInfo?.regeocode?.addressComponent?.city || "",
      district:
        routeDetail?.startInfo?.regeocode?.addressComponent?.district || "",
    };
    const endInfo = {
      country: routeDetail?.endInfo?.regeocode?.addressComponent?.country || "",
      province:
        routeDetail?.endInfo?.regeocode?.addressComponent?.province || "",
      city: routeDetail?.endInfo?.regeocode?.addressComponent?.city || "",
      district:
        routeDetail?.endInfo?.regeocode?.addressComponent?.district || "",
    };

    const transitCount = routeDetail?.transit_options.length;
    const transitsDistance =
      routeDetail?.transit_options.map(
        transitOption => transitOption.distance
      ) || [];
    const transitsDuration =
      routeDetail?.transit_options.map(transitOption => {
        const duration = transitOption.duration || 0;
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        const formattedTime = `${hours
          .toString()
          .padStart(2, "0")}小时 ${minutes
          .toString()
          .padStart(2, "0")}分钟 ${seconds.toString().padStart(2, "0")}秒`;

        return formattedTime;
      }) || [];
    const transitsFee =
      routeDetail?.transit_options.map(
        transitOption => transitOption.transit_fee
      ) || [];
    const isAtNights =
      routeDetail?.transit_options.map(transitOption =>
        transitOption.nightflag === "0" ? false : true
      ) || [];
    const transitsStepCount = routeDetail?.transit_options.segments.length;
    const transitsStartTime = routeDetail?.transit_options.segments.map(
      segment => ({
        busStartTime:
          segment?.bus.length !== 0
            ? segment.bus.flatMap(busline => busline.start_time)
            : [],
        subwayStartTime:
          segment?.subway.length !== 0
            ? segment.subway.flatMap(subwayline => subwayline.start_time)
            : [],
        cityRailwayStartTime:
          segment?.cityRailway.length !== 0
            ? segment.cityRailway.flatMap(
                cityRailwayline => cityRailwayline.start_time
              )
            : [],
      })
    );
    const transitsEndTime = routeDetail?.transit_options.segments.map(
      segment => ({
        busEndTime:
          segment?.bus.length !== 0
            ? segment.bus.flatMap(busline => busline.end_time)
            : [],
        subwayEndTime:
          segment?.subway.length !== 0
            ? segment.subway.flatMap(subwayline => subwayline.end_time)
            : [],
        cityRailwayEndTime:
          segment?.cityRailway.length !== 0
            ? segment.cityRailway.flatMap(
                cityRailwayline => cityRailwayline.end_time
              )
            : [],
      })
    );
    const transitsTimeTips = routeDetail?.transit_options.segments.map(
      segment => ({
        busTimeTips:
          segment?.bus.length !== 0
            ? segment.bus.flatMap(busline => busline.bustimetag)
            : [],
        subwayTimeTips:
          segment?.subway.length !== 0
            ? segment.subway.flatMap(subwayline => subwayline.bustimetag)
            : [],
        cityRailwayTimeTips:
          segment?.cityRailway.length !== 0
            ? segment.cityRailway.flatMap(
                cityRailwayline => cityRailwayline.bustimetag
              )
            : [],
      })
    );
    const transitsTimeTags = routeDetail?.transit_options.segments.map(
      segment => ({
        busTimeTags:
          segment?.bus.length !== 0
            ? segment.bus.flatMap(busline => busline.bus_time_tips)
            : [],
        subwayTimeTags:
          segment?.subway.length !== 0
            ? segment.subway.flatMap(subwayline => subwayline.bus_time_tips)
            : [],
        cityRailwayTimeTags:
          segment?.cityRailway.length !== 0
            ? segment.cityRailway.flatMap(
                cityRailwayline => cityRailwayline.bus_time_tips
              )
            : [],
      })
    );
    const transitsRouteName = routeDetail?.transit_options.segments.map(
      segment => ({
        busNames:
          segment?.bus.length !== 0
            ? segment.bus.flatMap(busline => busline.name)
            : [],
        subwayNames:
          segment?.subway.length !== 0
            ? segment.subway.flatMap(subwayline => subwayline.name)
            : [],
        cityRailwayNames:
          segment?.cityRailway.length !== 0
            ? segment.cityRailway.flatMap(
                cityRailwayline => cityRailwayline.name
              )
            : [],
        railwayNames:
          segment?.railway.length !== 0
            ? segment.railway.flatMap(railwayLine => railwayLine.name)
            : [],
      })
    );
    const transitsRailways = routeDetail?.transit_options.segments.map(
      segment => (segment.railway ? segment.railway : {})
    );
    const transitsTaxis = routeDetail?.transit_options.segments.map(segment =>
      segment.taxi ? segment.taxi : {}
    );
    const travelMode = routeDetail?.travel_mode || "unknown";

    const busPolyline = polyline?.map(polyline => polyline?.bus?.polyline);
    const subwayPolyline = polyline?.map(
      polyline => polyline?.subway?.polyline
    );
    const cityRailwayPolyline = polyline?.map(
      polyline => polyline?.cityRailway?.polyline
    );
    const taxiPolyline = polyline?.map(polyline => polyline?.taxi?.polyline);
    const transitsPolylines = polyline?.map(polyline => ({
      busPolyline: polyline.segments.map(segment =>
        segment?.bus ? segment.bus : {}
      ),
      subwayPolyline: polyline.segments.map(segment =>
        segment?.subway ? segment.subway : {}
      ),
      cityRailwayPolyline: polyline.segments.map(segment =>
        segment?.cityRailway ? segment.cityRailway : {}
      ),
      taxiPolyline: polyline.segments.map(segment =>
        segment?.taxi ? segment.taxi : {}
      ),
    }));

    const parsedRoutePolyline = {
      busPolyline,
      cityRailwayPolyline,
      subwayPolyline,
      taxiPolyline,
      transitsPolylines,
    };

    const parsedRouteDetail = {
      strategy,
      startLocation,
      endLocation,
      startInfo,
      endInfo,
      transitCount,
      transitsFee,
      isAtNights,
      transitsStepCount,
      transitsDistance,
      transitsDuration,
      transitsStartTime,
      transitsEndTime,
      transitsTimeTips,
      transitsTimeTags,
      transitsRouteName,
      transitsRailways,
      transitsTaxis,
      travelMode,
    };

    return { parsedRoutePolyline, parsedRouteDetail };
  });
}
