import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClickedLngLat } from "./mapSlice";

export default function useGlobalMapClick(AMap, map, isAMapReady) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!AMap || !map || !isAMapReady) return;

    const handleClick = e => {
      const lng = e.lnglat.lng;
      const lat = e.lnglat.lat;
      console.log("useGlobalMapClick", lng, lat);
      dispatch(setClickedLngLat([lng, lat]));
    };

    map.on("click", handleClick);
    return () => map.off("click", handleClick);
  }, [AMap, map, isAMapReady, dispatch]);
}
