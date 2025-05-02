import parseDrivingRouteResult from "./parseDrivingRouteResult";
import parseTransitRouteResult from "./parseTransitRouteResult";
import parseCyclingRouteResult from "./parseCyclingRouteResult";
import parseWalkingRouteResult from "./parseWalkingRouteResult";

export default function getParserByTravelMode(mode) {
  switch (mode) {
    case "DRIVING":
      return parseDrivingRouteResult;
    case "TRANSIT":
      return parseTransitRouteResult;
    case "WALKING":
      return parseWalkingRouteResult;
    case "CYCLING":
      return parseCyclingRouteResult;
    default:
      console.warn(`Unknown travel mode: ${mode}, fallback to driving`);
      return parseDrivingRouteResult;
  }
}
