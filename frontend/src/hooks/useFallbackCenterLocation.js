import { useSelector } from "react-redux";

function useFallbackCenterLocation() {
  return useSelector(store => store.map.fallbackCenterLocation);
}

export default useFallbackCenterLocation;
