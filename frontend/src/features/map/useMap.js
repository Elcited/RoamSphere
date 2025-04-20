import { useState, useEffect, useRef } from "react";
import useAMapLoader from "../../hooks/useAMapLoader";

export default function useMap(AMap, isSuccess, options = {}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!isSuccess) return;

    const mapInstance = new AMap.Map(mapRef.current, {
      zoom: 11,
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) mapInstance?.destroy();
    };
  }, [AMap, isSuccess]);

  // useEffect(() => {
  //   if (!AMap || !mapRef.current) return;
  //   const mapInstance = new AMap.Map(mapRef.current, {
  //     zoom: 11,
  //     resizeEnable: true,
  //     ...options,
  //   });

  //   // mapRef.current = mapInstance;
  //   setMap(mapInstance);

  //   return () => {
  //     if (mapInstance) {
  //       mapInstance?.destroy();
  //     }
  //   };
  // }, [AMap]);

  return { map, mapRef };
}
