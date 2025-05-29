import { useQuery } from "@tanstack/react-query";

const extractSimpleName = regeocode => {
  const { building, neighborhood, pois } = regeocode.addressComponent;

  if (building?.name) return building.name;
  if (neighborhood?.name) return neighborhood.name;
  if (pois?.length > 0) return pois[0].name;

  // fallback 到完整地址
  return regeocode.formattedAddress;
};

const fetchAddressByLnglat =
  AMap =>
  async ({ queryKey }) => {
    const [, lnglat] = queryKey;

    if (!lnglat || !Array.isArray(lnglat)) return;

    return new Promise((resolve, reject) => {
      AMap.plugin("AMap.Geocoder", () => {
        const geocoder = new AMap.Geocoder({ city: "全国" });

        if (!geocoder.getAddress) {
          reject(new Error("Geocoder not initialized properly"));
          return;
        }

        geocoder.getAddress(
          new AMap.LngLat(lnglat[0], lnglat[1]),
          (status, result) => {
            if (status === "complete" && result.info === "OK") {
              const simplified = extractSimpleName(result.regeocode);
              resolve(simplified);
            } else {
              reject(new Error("Failed to fetch address"));
            }
          }
        );
      });
    });
  };

export default function useReverseGeocodeQuery(AMap, lnglat) {
  return useQuery({
    queryKey: ["reveredAddress", lnglat], // 只用数组，避免 JSON 序列化失败
    queryFn: fetchAddressByLnglat(AMap), // 把 AMap 作为闭包传入
    enabled: !!AMap && Array.isArray(lnglat) && lnglat.length === 2,
    staleTime: 1000 * 60 * 10,
  });
}
