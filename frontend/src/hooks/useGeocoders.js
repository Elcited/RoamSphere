import { useEffect, useState } from "react";

export default function useGeocoders(AMap, start, end, isSuccess) {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  useEffect(() => {
    if (!AMap || !isSuccess || !start || !end) return;

    console.log("检测到地址变更：", start, end);

    AMap.plugin("AMap.Geocoder", () => {
      const geocoder = new AMap.Geocoder({ city: "全国" });

      geocoder.getLocation([start, end], (status, result) => {
        if (status === "complete" && result.info === "OK") {
          const startLoc = result.geocodes[0]?.location;
          const endLoc = result.geocodes[1]?.location;

          if (startLoc && endLoc) {
            const startLngLat = [startLoc.lng, startLoc.lat];
            const endLngLat = [endLoc.lng, endLoc.lat];

            setStartLocation(startLngLat);
            setEndLocation(endLngLat);

            console.log("地理编码成功：", startLngLat, endLngLat);
          } else {
            console.warn("部分地址未解析成功：", result.geocodes);
          }
        } else {
          console.warn("地理编码失败：", result);
        }
      });
    });
  }, [AMap, isSuccess, start, end]);

  return { startLocation, endLocation };
}
