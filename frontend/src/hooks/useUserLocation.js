import { useState, useEffect } from "react";

export default function useUserLocation(AMap) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!AMap) return;

    let geolocation;

    AMap.plugin("AMap.Geolocation", () => {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      geolocation.getCurrentPosition((status, result) => {
        if (status === "complete") {
          const { position } = result;
          setLocation({ lng: position.lng, lat: position.lat });
          console.log("useUserLocation执行！");
        } else {
          setError(result.message || "定位失败");
        }
      });
    });

    return () => {
      if (geolocation && typeof geolocation.clearWatch === "function") {
        geolocation.clearWatch();
      }
    };
  }, [AMap]);

  return { location, error };
}
