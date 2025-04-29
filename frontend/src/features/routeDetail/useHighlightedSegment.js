import { useEffect, useRef, useState } from "react";

export default function useHighlightedSegment(map, AMap, highlightedSegment) {
  useEffect(() => {
    if (!map || !AMap || !highlightedSegment?.length) return;

    const path = highlightedSegment
      .split(";")
      .map(p => p.split(","))
      .map(([lng, lat]) => new AMap.LngLat(lng, lat));

    const polyline = new AMap.Polyline({
      path,
      strokeColor: "#ff6f00",
      strokeWeight: 6,
      strokeOpacity: 1,
      lineJoin: "round",
      zIndex: 200,
    });

    map.add(polyline);
    return () => {
      map.remove(polyline);
    };
  }, [map, AMap, highlightedSegment]);
}
