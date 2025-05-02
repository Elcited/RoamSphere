import { useSelector } from "react-redux";
import useRenderRoutes from "../routeDetail/useRenderRoutes";
import useRenderHotels from "../hotels/useRenderHotels";
import useRenderAttractions from "../attractions/useRenderAttractions";
import useRenderPositions from "../positions/useRenderPositions";

export default function useMapModePlugin(
  AMap,
  map,
  mapMode,
  startLocation,
  endLocation,
  attractionCoordinate,
  hotelCoordinate,
  positionKeyWord,
  positionRegion,
  positionCoordinate,
  positionType
) {
  const travelMode = useSelector(state => state.route.travelMode);

  useRenderRoutes(AMap, map, startLocation, endLocation, mapMode, travelMode);
  useRenderHotels(AMap, map, hotelCoordinate, mapMode);
  useRenderAttractions(AMap, map, attractionCoordinate, mapMode);
  useRenderPositions(
    AMap,
    map,
    positionKeyWord,
    positionRegion,
    positionCoordinate,
    positionType,
    mapMode
  );
}
