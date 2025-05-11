import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export default function useGetRoutes(
  startLocation,
  endLocation,
  AMap,
  map,
  mapMode,
  travelMode
) {
  const { start, end, strategy } = useSelector(store => store.route);
  const startName = encodeURIComponent(start);
  const endName = encodeURIComponent(end);

  const isReady = !!(
    AMap &&
    map &&
    start &&
    end &&
    strategy !== undefined &&
    strategy !== null &&
    startLocation &&
    endLocation
  );

  return useQuery({
    queryKey: [
      "routes",
      strategy,
      travelMode,
      start,
      end,
      startLocation?.join(","),
      endLocation?.join(","),
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/routes/get_routes?mode=${travelMode}&strategy=${strategy}&startName=${startName}&startLng=${startLocation[0]}&startLat=${startLocation[1]}&endName=${endName}&endLng=${endLocation[0]}&endLat=${endLocation[1]}`
      );
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    staleTime: 60000,
    enabled: isReady,
  });
}
