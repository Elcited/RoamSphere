import parseDrivingRouteResult from "./parseDrivingRouteResult";
import parseTransitRouteResult from "./parseTransitRouteResult";
import parseCyclingRouteResult from "./parseCyclingRouteResult";
import parseWalkingRouteResult from "./parseWalkingRouteResult";

export default function getParserByTravelMode(mode) {
  switch (mode) {
    case "driving":
      return parseDrivingRouteResult;
    case "transit":
      return parseTransitRouteResult;
    case "walking":
      return parseWalkingRouteResult;
    case "cycling":
      return parseCyclingRouteResult;
    default:
      console.warn(`Unknown travel mode: ${mode}, fallback to driving`);
      return parseDrivingRouteResult;
  }
}
