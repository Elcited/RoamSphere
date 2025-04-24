import styled from "styled-components";
import Map from "../ui/Map";
import MapSidebar from "../ui/MapSidebar";
import SearchPanel from "../ui/SearchPanel";
import MapSpeedDial from "../ui/MapSpeedDial";
import { Outlet, useLocation } from "react-router-dom";

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
      <SearchPanel>{!isRoutesPage && <Outlet />}</SearchPanel>
      <MapSpeedDial />
      <Map />
    </MainMapContainer>
  );
}

export default MainMap;
