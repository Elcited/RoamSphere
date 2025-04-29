import { useQuery } from "@tanstack/react-query";

export default function useGetAttractions(
  attractionCoordinate,
  AMap,
  map,
  mapMode
) {
  const radius = 10000;

  return useQuery({
    queryKey: ["attractions", attractionCoordinate],
    queryFn: async () => {
      const res = await fetch(
        `/api/attractions/get_attractions?location=${attractionCoordinate[0]},${attractionCoordinate[1]}&radius=${radius}`
      );
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    enabled: !!(AMap && map && attractionCoordinate && mapMode),
  });
}
