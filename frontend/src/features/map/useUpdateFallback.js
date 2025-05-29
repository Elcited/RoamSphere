import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useMapCenter from "./useMapCenter";
import { setFallbackCenterLocation } from "./mapSlice";

function useUpdateFallback(map) {
  const dispatch = useDispatch();
  // const center = useMapCenter(map);
  const { useEndAsCenter, isGetMapCenter } = useSelector(store => store.map);

  useEffect(() => {
    if (useEndAsCenter) return;

    let fallback = "北京";
    if (isGetMapCenter && center) {
      fallback = center;
    }

    dispatch(setFallbackCenterLocation(fallback));
  }, [useEndAsCenter, isGetMapCenter, center, dispatch]);
}

export default useUpdateFallback;
