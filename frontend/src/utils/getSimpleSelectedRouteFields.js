export default function getSimpleSelectedRouteFields(routeData, selectedIndex) {
  if (
    !routeData ||
    !Array.isArray(routeData.routesInfo) ||
    selectedIndex == null ||
    selectedIndex >= routeData.routesInfo.length
  ) {
    return {
      routeInfo: undefined,
      routeInstructions: undefined,
      routeNavigations: undefined,
      routeOrientations: undefined,
      routeRoadCities: undefined,
      routeRoadStatus: undefined,
      routeRoadDistance: undefined,
      routeWalkTypes: undefined,
      routeStepDistance: undefined,
    };
  }

  return {
    routeInfo: routeData.routesInfo[selectedIndex],
    routeInstructions: routeData.routesInstructions?.[selectedIndex],
    routeNavigations: routeData.routesNavigations?.[selectedIndex],
    routeOrientations: routeData.routesOrientations?.[selectedIndex],
    routeRoadCities: routeData.routesRoadCities?.[selectedIndex],
    routeRoadStatus: routeData.routesRoadStatus?.[selectedIndex],
    routeRoadDistance: routeData.routesRoadDistance?.[selectedIndex],
    routeWalkTypes: routeData.routesWalkTypes?.[selectedIndex],
    routeStepDistance: routeData.routesStepDistance?.[selectedIndex],
  };
}
