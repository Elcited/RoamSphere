import { useQuery } from "@tanstack/react-query";

export default function useGetAttractions(endLocation, AMap, map) {
  const radius = 10000;

  return useQuery({
    queryKey: ["attractions", endLocation],
    queryFn: async () => {
      const res = await fetch(
        `/api/attractions/get_attractions?location=${endLocation[0]},${endLocation[1]}&radius=${radius}`
      );
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    enabled: !!(AMap && map && endLocation),
  });
}
