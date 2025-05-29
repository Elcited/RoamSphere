import styled from "styled-components";
import SimpleRouteInfoOverviewTips from "./SimpleRouteInfoOverviewTips";

const RouteInfoOverview = styled.div`
  padding: 0.9rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  color: #555;
`;

const RouteInfoOverviewItem = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const TimeAndDistanceContainer = styled.div`
  display: flex;
  gap: 4.8rem;
`;

const TimeAndDistanceBox = styled.h2`
  color: #555;
  font-weight: 600;
`;

function SimpleRouteInfoOverview({ routeInfo, routeWalkTypes }) {
  const { distance, duration } = routeInfo;
  const { trafficLights, totalTolls } = routeInfo;

  return (
    <div>
      <RouteInfoOverview>
        <RouteInfoOverviewItem>
          <TimeAndDistanceContainer>
            <TimeAndDistanceBox>{distance}</TimeAndDistanceBox>
            <TimeAndDistanceBox>{duration}</TimeAndDistanceBox>
          </TimeAndDistanceContainer>
        </RouteInfoOverviewItem>
        <RouteInfoOverviewItem>
          <SimpleRouteInfoOverviewTips
            trafficLights={trafficLights}
            totalTolls={totalTolls}
            routeWalkTypes={routeWalkTypes}
          />
        </RouteInfoOverviewItem>
      </RouteInfoOverview>
    </div>
  );
}

export default SimpleRouteInfoOverview;
