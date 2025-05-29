import styled from "styled-components";
import useWalkTypeDescription from "../hooks/useWalkTypeDescription";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
`;

const StyledSpan = styled.span`
  display: inline-block;
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
        <Wrapper>
          <StyledSpan>预计经过{trafficLights}个红绿灯</StyledSpan>
          <StyledSpan>路段总收费{totalTolls}</StyledSpan>
        </Wrapper>
      ) : (
        <Wrapper>
          <StyledSpan>{walkTypeDescription}</StyledSpan>
        </Wrapper>
      )}
    </div>
  );
}

export default SimpleRouteInfoOverviewTips;
