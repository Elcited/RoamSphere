import { useEffect, useState } from "react";

export default function useSingleGeocoder(AMap, address, isReady = true) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!AMap || !address || !isReady) return;

    // 如果 address 是一个长度为 2 的数组，直接返回
    if (Array.isArray(address) && address.length === 2) {
      setLocation(address);
      console.log("直接返回地址：", address);
      return;
    }

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
