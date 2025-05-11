import styled from "styled-components";
import useWalkTypeDescription from "../hooks/useWalkTypeDescription";

const StyledSpan = styled.span`
  padding: 0.9rem;
`;

function SimpleRouteInfoOverviewTips({
  trafficLights,
  totalTolls,
  routeWalkTypes,
}) {
  const walkTypeDescription = useWalkTypeDescription(routeWalkTypes);

  return (
    <div>
      {trafficLights || totalTolls ? (
        <>
          <StyledSpan>预计经过{trafficLights}个红绿灯</StyledSpan>
          <StyledSpan>路段总收费{totalTolls}</StyledSpan>
        </>
      ) : (
        <>
          <StyledSpan>{walkTypeDescription}</StyledSpan>
        </>
      )}
    </div>
  );
}

export default SimpleRouteInfoOverviewTips;
