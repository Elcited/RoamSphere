import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useGeocoder(AMap, isSuccess) {
  const { start, end } = useSelector(store => store.routeDetail);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  useEffect(() => {
    if (!AMap || !isSuccess) return;

    const addresses = [start.toString(), end.toString()];
    console.log("地址为：", start, end);
    console.log(addresses);

    console.log("正在获取经纬度...");
    AMap.plugin("AMap.Geocoder", () => {
      const geocoder = new AMap.Geocoder({
        city: "全国",
      });

      geocoder.getLocation(addresses, function (status, result) {
        if (status === "complete" && result.info === "OK") {
          const startLngLat = [
            result.geocodes[0].location.lng,
            result.geocodes[0].location.lat,
          ];
          const endLngLat = [
            result.geocodes[1].location.lng,
            result.geocodes[1].location.lat,
          ];
          setStartLocation(startLngLat);
          setEndLocation(endLngLat);

          console.log("经纬度获取成功：", startLngLat, endLngLat);
        } else {
          console.log("获取失败！API可能已经限流。");
        }
      });
    });
  }, [AMap, isSuccess]);

  return { startLocation, endLocation };
}
