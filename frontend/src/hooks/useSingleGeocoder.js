import { useEffect, useState } from "react";

export default function useGeocode(AMap, address, isReady = true) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!AMap || !address || !isReady) return;

    AMap.plugin("AMap.Geocoder", () => {
      const geocoder = new AMap.Geocoder({ city: "全国" });

      console.log("正在解析地址：", address);

      geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          const { lng, lat } = result.geocodes[0].location;
          setLocation([lng, lat]);
          console.log("地址解析成功：", [lng, lat]);
        } else {
          console.warn("地址解析失败：", result);
        }
      });
    });
  }, [AMap, address, isReady]);

  return location;
}
