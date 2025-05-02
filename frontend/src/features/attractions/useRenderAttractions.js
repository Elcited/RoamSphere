import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGetAttractions from "../attractions/useGetAttractions";
import {
  setAttractionsArray,
  setIsAttractionRendered,
} from "../attractions/attractionSlice";
import parseAttractionsResult from "../../utils/parseAttractionsResult";

export default function useRenderAttractions(
  AMap,
  map,
  attractionCoordinate,
  mapMode
) {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetAttractions(
    mapMode === "attraction" ? attractionCoordinate : null,
    AMap,
    map,
    mapMode
  );

  useEffect(() => {
    if (mapMode !== "attraction" || !isSuccess || !AMap || !map) return;

    const parsed = parseAttractionsResult(data.attractions);
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
    dispatch(setAttractionsArray(parsed));
    dispatch(setIsAttractionRendered(true));
  }, [AMap, map, mapMode, isSuccess, data]);
}
