import styled from "styled-components";
import RoutesSearchInputs from "./RoutesSearchInputs";
import { Outlet, useLocation } from "react-router-dom";
import RoutesDisplay from "./RoutesDisplay";
import RouteDestinationRecommand from "./RouteDestinationRecommand";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 40rem;
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function RouteOverview() {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Container>
      {location.pathname.includes("route_detail") ? (
        <Outlet />
      ) : (
        <>
          <RoutesSearchInputs />
          <RoutesDisplay />
          <RouteDestinationRecommand />
        </>
      )}
    </Container>
  );
}

export default RouteOverview;
