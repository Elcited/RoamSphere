import { useEffect, useRef, useState } from "react";

export default function useInitializeMap(AMap, isSuccess) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!isSuccess || !AMap) return;
    const mapInstance = new AMap.Map(mapRef.current, {
      zoom: 11,
      plugins: ["AMap.Geocoder", , "AMap.AutoComplete", "AMap.PlaceSearch"],
    });
    setMap(mapInstance);
    return () => mapInstance?.destroy();
  }, [AMap, isSuccess]);

  return { mapRef, map };
}
