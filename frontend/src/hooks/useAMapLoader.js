import AMapLoader from "@amap/amap-jsapi-loader";
import { useQuery } from "@tanstack/react-query";

const loadAMap = async () => {
  window._AMapSecurityConfig = {
    securityJsCode: "cc9674253953054af0b8b6db70b11913",
  };
  return await AMapLoader.load({
    key: "53ee9b9d18da4da1618d96fdd63efa87",
    version: "2.0",
  });
};

export default function useAMapLoader() {
  return useQuery({
    queryKey: ["AMap"],
    queryFn: loadAMap,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
