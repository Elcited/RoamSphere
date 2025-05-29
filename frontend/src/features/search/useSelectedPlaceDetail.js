import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function useSelectedPlaceDetail() {
  const { attractionsArray } = useSelector(store => store.attraction);
  const { hotelsArray } = useSelector(store => store.hotel);
  const { positionsArray } = useSelector(store => store.position);
  const selectedPlaceIndex = useSelector(
    store => store.search.selectedPlaceIndex
  );

  const { pathname } = useLocation();

  let dataArray = [];

  if (pathname.includes("/attractions")) {
    dataArray = attractionsArray;
  } else if (pathname.includes("/hotels")) {
    dataArray = hotelsArray;
  } else if (pathname.includes("/positions")) {
    dataArray = positionsArray;
  }

  if (
    !dataArray ||
    !Array.isArray(dataArray) ||
    selectedPlaceIndex === null ||
    selectedPlaceIndex >= dataArray.length
  ) {
    return null;
  }

  return dataArray[selectedPlaceIndex];
}
