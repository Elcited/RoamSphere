import styled from "styled-components";
import SimpleRouteInfoOverviewTips from "./SimpleRouteInfoOverviewTips";

const RouteInfoOverview = styled.div`
  padding: 0.9rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const RouteInfoOverviewItem = styled.div``;

function SimpleRouteInfoOverview({ routeInfo, routeWalkTypes }) {
  const { distance, duration } = routeInfo;
  const { trafficLights, totalTolls } = routeInfo;

  return (
    <div>
      <RouteInfoOverview>
        <RouteInfoOverviewItem>
          <h1>
            <span>{duration}</span>
            {""}
            <span>{distance}</span>
          </h1>
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
