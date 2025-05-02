export default function parseCyclingRouteResult(routes) {
  return routes.map(route => {
    const strategy = route.strategy;
    const polyline = route.polyline;
    const routeDetail = route.routeDetail;

    console.log(polyline);
    console.log(routeDetail);

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
    const duration = routeDetail?.duration || "";
    const distance = routeDetail?.distance || "";
    const travelMode = routeDetail?.travel_mode;

    const polylinesForRenderRoutes =
      polyline?.polylines
        ?.flatMap(polyline => polyline.split(";"))
        ?.map(polyline => polyline.split(","))
        .map(p => p.map(p => Number(p))) || [];
    const polylinesForRenderDetails = polyline?.polylines || [];
    const instructions = polyline?.instructions || [];
    const navigations = polyline?.navigations || [];
    const orientations = polyline?.orientations || [];
    const stepDistance = polyline?.step_distance || [];

    const parsedRoutePolyline = {
      polylinesForRenderRoutes,
      polylinesForRenderDetails,
      instructions,
      navigations,
      orientations,
      stepDistance,
    };

    const parsedRouteDetail = {
      strategy,
      startLocation,
      endLocation,
      startInfo,
      endInfo,
      duration,
      distance,
      travelMode,
    };

    return { parsedRoutePolyline, parsedRouteDetail };
  });
}
