import styled from "styled-components";
import { useSelector } from "react-redux";
import useSelectedRouteIndex from "../hooks/useSelectedRouteIndex";
import TransitRouteInfo from "./TransitRouteInfo";
import SimpleRouteInfo from "./SimpleRouteInfo";

const Container = styled.div`
  padding: 0.9rem;
  position: relative;
  width: 40rem;
  background-color: #fff;
`;

function RouteInfo() {
  const { travelMode } = useSelector(store => store.route);
  const selectedRouteIndex = useSelectedRouteIndex(travelMode);
  const isTransit = travelMode === "transit";

  return (
    <Container>
      {isTransit ? (
        <TransitRouteInfo
          travelMode={travelMode}
          selectedRouteIndex={selectedRouteIndex}
        />
      ) : (
        <SimpleRouteInfo
          travelMode={travelMode}
          selectedRouteIndex={selectedRouteIndex}
        />
      )}
    </Container>
  );
}

export default RouteInfo;
