import { useQuery } from "@tanstack/react-query";

export default function useGetHotels(hotelCoordinate, AMap, map, mapMode) {
  const radius = 10000;

  return useQuery({
    queryKey: ["hotels", hotelCoordinate],
    queryFn: async () => {
      const res = await fetch(
        `/api/hotels/get_hotels?location=${hotelCoordinate[0]},${hotelCoordinate[1]}&radius=${radius}`
      );
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    enabled: !!(AMap && map && hotelCoordinate && mapMode),
  });
}
