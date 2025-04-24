import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useMapModePlugin from "../features/map/useMapModePlugin";
import useGeocoders from "../hooks/useGeocoders";
import useAMapLoader from "../hooks/useAMapLoader";
import useSingleGeocoder from "../hooks/useSingleGeocoder";

const MapContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

function Map() {
  const { data: AMap, isSuccess, isLoading: isAMapLoading } = useAMapLoader();
  const { mapMode } = useSelector(store => store.map);
  const { start, end, highlightedSegment } = useSelector(
    store => store.routeDetail
  );
  const { attractionCenterLocation } = useSelector(store => store.attraction);
  const { hotelCenterLocation } = useSelector(store => store.hotel);
  const {
    positionKeyWord,
    positionRegion,
    positionCenterLocation,
    positionType,
  } = useSelector(store => store.position);

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const { startLocation, endLocation } = useGeocoders(
    AMap,
    start,
    end,
    isSuccess
  );

  const attractionCoordinate = useSingleGeocoder(
    AMap,
    attractionCenterLocation,
    isSuccess
  );

  const hotelCoordinate = useSingleGeocoder(
    AMap,
    hotelCenterLocation,
    isSuccess
  );

  const positionCoordinate = useSingleGeocoder(
    AMap,
    positionCenterLocation,
    isSuccess
  );

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
    positionType
  );

  useEffect(() => {
    if (!isSuccess || !AMap) return;
    const mapInstance = new AMap.Map(mapRef.current, {
      zoom: 11,
    });
    setMap(mapInstance);

    return () => {
      mapInstance?.destroy();
    };
  }, [AMap, isSuccess]);

  useEffect(() => {
    if (!map || !AMap || !highlightedSegment?.length) return;

    const highLightedPath = highlightedSegment
      .split(";")
      .map(h => h.split(","))
      .map(h => new AMap.LngLat(h[0], h[1]));

    let highlightLine = new AMap.Polyline({
      path: highLightedPath,
      strokeColor: "#ff6f00",
      strokeWeight: 6,
      strokeOpacity: 1,
      lineJoin: "round",
      zIndex: 200,
    });

    map.add(highlightLine);

    return () => {
      map.remove(highlightLine);
    };
  }, [map, AMap, highlightedSegment]);

  return <MapContainer ref={mapRef}></MapContainer>;
}

export default Map;
