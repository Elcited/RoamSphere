import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function usePlaceDetailData() {
  const { attractionsArray } = useSelector(store => store.attraction);
  const { hotelsArray } = useSelector(store => store.hotel);
  const { positionsArray } = useSelector(store => store.position);

  const { pathname } = useLocation();

  if (pathname.includes("/attractions")) {
    return attractionsArray;
  } else if (pathname.includes("/hotels")) {
    return hotelsArray;
  } else if (pathname.includes("/positions")) {
    return positionsArray;
  }

  return null;
}
