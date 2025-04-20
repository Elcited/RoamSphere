import styled from "styled-components";
import Map from "../ui/Map";
import MapSidebar from "../ui/MapSidebar";
import FloatingInfoPanel from "../ui/FloatingInfoPanel";
import MapSearchInput from "../ui/MapSearchInput";
import MapSpeedDial from "../ui/MapSpeedDial";

const MainMapContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

function MainMap() {
  return (
    <MainMapContainer>
      <MapSidebar />
      <MapSearchInput />
      <FloatingInfoPanel>xxx</FloatingInfoPanel>
      <MapSpeedDial />
      <Map />
    </MainMapContainer>
  );
}

export default MainMap;
