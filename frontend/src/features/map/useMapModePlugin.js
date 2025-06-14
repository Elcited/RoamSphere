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
  const { isAttractionRendered } = useSelector(store => store.attraction);
  const { isHotelRendered } = useSelector(store => store.hotel);
  const { isPositionRendered } = useSelector(store => store.position);

  useRenderRoutes(AMap, map, startLocation, endLocation, mapMode, travelMode);
  useRenderAttractions(
    AMap,
    map,
    attractionCoordinate,
    mapMode,
    isAttractionRendered
  );
  useRenderHotels(AMap, map, hotelCoordinate, mapMode, isHotelRendered);
  useRenderPositions(
    AMap,
    map,
    positionKeyWord,
    positionRegion,
    positionCoordinate,
    positionType,
    mapMode,
    isPositionRendered
  );
}
