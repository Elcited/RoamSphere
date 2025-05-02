import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useGetPositions from "./useGetPositions";
import { setIsPositionRendered, setPositionsArray } from "./positionSlice";
import parseAttractionsResult from "../../utils/parseAttractionsResult";

export default function useRenderPositions(
  AMap,
  map,
  positionKeyWord,
  positionRegion,
  positionCoordinate,
  positionType,
  mapMode
) {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetPositions(
    positionKeyWord,
    positionRegion,
    mapMode === "position" ? positionCoordinate : null,
    positionType,
    AMap,
    map
  );

  useEffect(() => {
    if (mapMode !== "position" || !isSuccess || !AMap || !map) return;

    const parsed = parseAttractionsResult(data.positions);
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
    dispatch(setPositionsArray(parsed));
    dispatch(setIsPositionRendered(true));
  }, [AMap, map, mapMode, isSuccess, data]);
}
