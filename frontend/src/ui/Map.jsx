import { useSelector } from "react-redux";
import styled from "styled-components";
import useAMapLoader from "../hooks/useAMapLoader";
import useInitializeMap from "../hooks/useInitializeMap";
import useMapModePlugin from "../features/map/useMapModePlugin";
import useGeocodedLocations from "../hooks/useGeocodedLocations";
import useMapControls from "../features/map/useMapControls";
import useUpdateFallback from "../features/map/useUpdateFallback";

const MapContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

function Map() {
  const { data: AMap, isSuccess, isLoading: isAMapLoading } = useAMapLoader();
  const { mapMode, useEndAsCenter } = useSelector(store => store.map);
  const { start, end } = useSelector(store => store.route);
  const { attractionCenterLocation } = useSelector(store => store.attraction);
  const { hotelCenterLocation } = useSelector(store => store.hotel);
  const {
    positionKeyWord,
    positionRegion,
    positionCenterLocation,
    positionType,
  } = useSelector(store => store.position);

  /* 加载地图实例 */
  const { mapRef, map } = useInitializeMap(AMap, isSuccess);

  /* 加载地图控件 */
  useMapControls(AMap, map, isSuccess);

  /* 获取地点经纬度 */
  const {
    startLocation,
    endLocation,
    attractionCoordinate,
    hotelCoordinate,
    positionCoordinate,
  } = useGeocodedLocations(AMap, isSuccess, {
    start,
    end,
    attractionCenterLocation,
    hotelCenterLocation,
    positionCenterLocation,
  });

  useUpdateFallback(AMap, map);

  useMapModePlugin(
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
    positionType,
    useEndAsCenter
  );

  return <MapContainer ref={mapRef}></MapContainer>;
}

export default Map;
