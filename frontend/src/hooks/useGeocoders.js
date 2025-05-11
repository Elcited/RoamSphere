import { useEffect, useRef, useState } from "react";

export default function useGeocoders(
  AMap,
  start,
  end,
  isSuccess,
  city = "全国"
) {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const cache = useRef(new Map());

  useEffect(() => {
    if (!AMap || !isSuccess || !start || !end) return;

    const fetchLocation = (key, address, setLocation) => {
      if (cache.current.has(address)) {
        console.log(`使用缓存：${address}`);
        setLocation(cache.current.get(address));
        return;
      }

      AMap.plugin(["AMap.Geocoder", "AMap.PlaceSearch"], () => {
        const geocoder = new AMap.Geocoder({ city });

        geocoder.getLocation(address, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const loc = result.geocodes[0]?.location;
            if (loc) {
              const lngLat = [loc.lng, loc.lat];
              cache.current.set(address, lngLat);
              setLocation(lngLat);
              console.log(`Geocoder 成功 (${key})：`, lngLat);
            } else {
              fallbackToPlaceSearch();
            }
          } else {
            console.warn(
              `Geocoder 失败 (${key})，尝试 fallback 到 PlaceSearch：`,
              result
            );
            fallbackToPlaceSearch();
          }
        });

        function fallbackToPlaceSearch() {
          const placeSearch = new AMap.PlaceSearch({ city });
          placeSearch.search(address, (status, result) => {
            if (status === "complete" && result.poiList?.pois.length > 0) {
              const loc = result.poiList.pois[0].location;
              const lngLat = [loc.lng, loc.lat];
              cache.current.set(address, lngLat);
              setLocation(lngLat);
              console.log(`PlaceSearch 成功 (${key})：`, lngLat);
            } else {
              console.error(`PlaceSearch 失败 (${key})：`, result);
            }
          });
        }
      });
    };

    fetchLocation("start", start, setStartLocation);
    fetchLocation("end", end, setEndLocation);
  }, [AMap, isSuccess, start, end, city]);

  return { startLocation, endLocation };
}
