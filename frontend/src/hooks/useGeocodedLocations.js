import useGeocoders from "./useGeocoders";
import useSingleGeocoder from "./useSingleGeocoder";

export default function useGeocodedLocations(
  AMap,
  isSuccess,
  {
    start,
    end,
    attractionCenterLocation,
    hotelCenterLocation,
    positionCenterLocation,
  }
) {
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

  return {
    startLocation,
    endLocation,
    attractionCoordinate,
    hotelCoordinate,
    positionCoordinate,
  };
}
