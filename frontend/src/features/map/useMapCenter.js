import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function useMapCenter(map) {
  const [center, setCenter] = useState(null);
  const { isGetMapCenter } = useSelector(store => store.map);

  const updateCenter = useCallback(() => {
    if (!map) return;

    const amapCenter = map.getCenter?.();
    if (amapCenter) {
      setCenter([amapCenter.getLng(), amapCenter.getLat()]);
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;

    if (isGetMapCenter) {
      updateCenter();
      map.on("moveend", updateCenter);
    }

    return () => {
      map?.off("moveend", updateCenter);
    };
  }, [map, isGetMapCenter, updateCenter]);

  useEffect(() => {
    if (map && center === null) {
      updateCenter();
    }
  }, [map, updateCenter, center]);

  return center;
}
