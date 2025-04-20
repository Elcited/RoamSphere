import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useMapModePlugin from "../features/map/useMapModePlugin";
import useGeocoder from "../hooks/useGeocoders";
import useAMapLoader from "../hooks/useAMapLoader";

const MapContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

function Map() {
  const { data: AMap, isSuccess, isLoading: isAMapLoading } = useAMapLoader();
  const { mapMode } = useSelector(store => store.map);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const { startLocation, endLocation } = useGeocoder(AMap, map);

  useMapModePlugin(AMap, map, mapMode, startLocation, endLocation);

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

  return <MapContainer ref={mapRef}></MapContainer>;
}

export default Map;
