import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGetHotels from "../hotels/useGetHotels";
import { setHotelsArray, setIsHotelRendered } from "../hotels/hotelSlice";
import parseHotelsResult from "../../utils/pareseHotelsResult";

export default function useRenderHotels(AMap, map, hotelCoordinate, mapMode) {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetHotels(
    mapMode === "hotel" ? hotelCoordinate : null,
    AMap,
    map,
    mapMode
  );

  useEffect(() => {
    if (mapMode !== "hotel" || !isSuccess || !AMap || !map) return;

    const parsed = parseHotelsResult(data.hotels);
    const coords = parsed.map(r => r.location.coordinates);
    const markers = coords.map(
      (c, i) =>
        new AMap.Marker({
          position: new AMap.LngLat(c[0], c[1]),
          offset: new AMap.Pixel(-10, -10),
          title: parsed[i].name,
        })
    );
    map.add(markers);
    dispatch(setHotelsArray(parsed));
    dispatch(setIsHotelRendered(true));
  }, [AMap, map, mapMode, isSuccess, data]);
}
