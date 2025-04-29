import styled from "styled-components";
import Map from "../ui/Map";
import MapSidebar from "../ui/MapSidebar";
import MapSearchPanel from "../ui/MapSearchPanel";
import MapSearchButtons from "../ui/MapSearchButtons";
import MapControlPanel from "../ui/MapControlPanel";
import MapLocationToggle from "../ui/MapLocationToggle";
import { Outlet, useLocation } from "react-router-dom";
import MapCenterToggle from "../ui/MapCenterToggle";

const MainMapContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

function MainMap() {
  const location = useLocation();
  const isRoutesPage = location.pathname.includes("/map/routes");

  return (
    <MainMapContainer>
      <MapSidebar />
      <MapSearchPanel>{!isRoutesPage && <Outlet />}</MapSearchPanel>
      <MapSearchButtons />
      <MapControlPanel />
      <MapLocationToggle />
      <MapCenterToggle />
      <Map />
    </MainMapContainer>
  );
}

export default MainMap;
