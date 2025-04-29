import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useRenderMarkers(
  AMap,
  map,
  mapMode,
  data,
  isSuccess,
  parseFunction,
  setArrayAction,
  setIsRenderedAction
) {
  const dispatch = useDispatch();

  const memoizedParseFunction = useCallback(parseFunction, [parseFunction]);

  useEffect(() => {
    if (!AMap || !map || !isSuccess) return;

    const { source, items: markersData } = data;
    const parsedResult = memoizedParseFunction(markersData);

    if (!parsedResult) return;

    const markerCoordinates = parsedResult.map(r => r.location.coordinates);

    if (!markerCoordinates) return;

    const markers = markerCoordinates.map(
      (c, index) =>
        new AMap.Marker({
          position: new AMap.LngLat(c[0], c[1]),
          offset: new AMap.Pixel(-10, -10),
          title: parsedResult[index].name,
        })
    );

    markers.forEach(marker => map.add(marker));

    dispatch(setIsRenderedAction(true));
    dispatch(setArrayAction(parsedResult));

    return () => {
      markers.forEach(marker => map.remove(marker));
    };
  }, [
    AMap,
    map,
    mapMode,
    isSuccess,
    data,
    dispatch,
    memoizedParseFunction,
    setArrayAction,
    setIsRenderedAction,
  ]);
}
