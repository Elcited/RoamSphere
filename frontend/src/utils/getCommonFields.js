export default function getCommonRouteFields(slice) {
  return {
    routesInfo: slice.routesInfo ?? [],
    routesPolylines: slice.routesPolylines ?? [],
    routesCities: slice.routesCities ?? [],
    routesInstructions: slice.routesInstructions ?? [],
    routesNavigations: slice.routesNavigations ?? [],
    routesOrientations: slice.routesOrientations ?? [],
  };
}
