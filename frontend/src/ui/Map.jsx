import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import useAMapLoader from "../hooks/useAMapLoader";
import useInitializeMap from "../hooks/useInitializeMap";
import useMapModePlugin from "../features/map/useMapModePlugin";
import useGeocodedLocations from "../hooks/useGeocodedLocations";
import useMapControls from "../features/map/useMapControls";
import useGlobalMapClick from "../features/map/useGlobalMapClick";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  setCurrentCenterLocation,
  setIsGetMapCenter,
  setUseEndAsCenter,
} from "../features/map/mapSlice";
import {
  setPlaceDetailPanelVisible,
  setSearchPanelExpanded,
} from "../features/search/searchSlice";

const MapContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;
import { clearAttractionSlice } from "../features/attractions/attractionSlice";
import { clearHotelSlice } from "../features/hotels/hotelSlice";
import { clearPositionSlice } from "../features/positions/positionSlice";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";
import { useMapContext } from "../context/MapContext";

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
  const location = useLocation();
  const cityName = location.state?.cityName;
  const dispatch = useDispatch();
  const { setCoordinates } = useMapContext();

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

  useGlobalMapClick(AMap, map, isSuccess);

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

  useEffect(() => {
    setCoordinates(prev => ({
      ...prev,
      startLocation,
      endLocation,
      attractionCoordinate,
      hotelCoordinate,
      positionCoordinate,
    }));
  }, [
    startLocation,
    endLocation,
    attractionCoordinate,
    hotelCoordinate,
    positionCoordinate,
  ]);

  useEffect(() => {
    if (cityName && map) {
      dispatch(setCurrentCenterLocation(cityName));
      dispatch(setSearchPanelExpanded(false));
      dispatch(setPlaceDetailPanelVisible(false));
      dispatch(setIsGetMapCenter(true));
      dispatch(setUseEndAsCenter(true));
      dispatch(clearAttractionSlice());
      dispatch(clearHotelSlice());
      dispatch(clearPositionSlice());
      dispatch(clearDrivingRoute());
      dispatch(clearCyclingRoute());
      dispatch(clearWalkingRoute());
      dispatch(clearTransitRoute());
      // 使用高德 API 搜索城市中心点并 setCenter
      AMap.plugin("AMap.Geocoder", function () {
        const geocoder = new AMap.Geocoder();
        geocoder.getLocation(cityName, function (status, result) {
          if (status === "complete" && result.geocodes.length) {
            const { location } = result.geocodes[0];
            // 平滑飞过去
            map.setZoom(12); // 先设置目标缩放
            map.panTo([location.lng, location.lat]); // 平滑移动
          }
        });
      });
    }
  }, [AMap, map, cityName]);

  return <MapContainer ref={mapRef}></MapContainer>;
}

export default Map;
