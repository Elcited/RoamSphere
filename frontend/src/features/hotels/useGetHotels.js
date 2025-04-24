import { useQuery } from "@tanstack/react-query";

export default function useGetHotels(hotelCenterLocation, AMap, map, mapMode) {
  const radius = 10000;

  return useQuery({
    queryKey: ["hotels", hotelCenterLocation, mapMode],
    queryFn: async () => {
      const res = await fetch(
        `/api/hotels/get_hotels?location=${hotelCenterLocation[0]},${hotelCenterLocation[1]}&radius=${radius}`
      );
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    enabled: !!(AMap && map && hotelCenterLocation && mapMode),
  });
}
