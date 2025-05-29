import styled from "styled-components";
import Map from "../ui/Map";
import MapSidebar from "../ui/MapSidebar";
import MapSearchBar from "../ui/MapSearchBar";
import MapSearchPanel from "../ui/MapSearchPanel";
import PlaceDetailPanel from "../ui/PlaceDetailPanel";
import MapSearchButtons from "../ui/MapSearchButtons";
import MapControlPanel from "../ui/MapControlPanel";
import MapLocationToggle from "../ui/MapLocationToggle";
import MapCenterToggle from "../ui/MapCenterToggle";
import { useDispatch } from "react-redux";
import { clearAttractionSlice } from "../features/attractions/attractionSlice";
import { clearHotelSlice } from "../features/hotels/hotelSlice";
import { clearPositionSlice } from "../features/positions/positionSlice";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";
import { useEffect } from "react";
import { setStartEndEmpty } from "../features/routeDetail/routeSlice";

const MainMapContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`;

function MainMap() {
  const dispatch = useDispatch();

  return (
    <MainMapContainer>
      <MapSidebar />
      <MapSearchBar />
      <MapSearchPanel />
      <PlaceDetailPanel />
      <MapSearchButtons />
      <MapControlPanel />
      <MapLocationToggle />
      <MapCenterToggle />
      <Map />
    </MainMapContainer>
  );
}

export default MainMap;
