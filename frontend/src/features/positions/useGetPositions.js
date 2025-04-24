import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useGetPositions(
  positionKeyWord = null,
  positionRegion = null,
  positionCoordinate = null,
  positionType,
  AMap,
  map
) {
  const radius = 10000;
  console.log("positionType", positionType);
  console.log("positionKeyWord", positionKeyWord);
  console.log("positionCenterLocation", positionCoordinate);

  return useQuery({
    queryKey: [
      "positions",
      positionKeyWord,
      positionRegion,
      positionCoordinate,
      positionType,
    ],
    queryFn: async () => {
      let url;

      if (positionKeyWord && positionRegion) {
        url = `/api/positions/get_positions?keyword=${encodeURIComponent(
          positionKeyWord
        )}&region=${encodeURIComponent(positionRegion)}&radius=${radius}`;
      } else if (positionCoordinate && positionCoordinate.length === 2) {
        url = `/api/positions/get_positions?location=${positionCoordinate[0]},${positionCoordinate[1]}&type=${positionType}&radius=${radius}`;
      } else {
        throw new Error("No valid search parameters");
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("No such data in database");

      return res.json();
    },
    enabled: !!(
      AMap &&
      map &&
      (positionKeyWord || positionCoordinate || positionType)
    ),
  });
}
