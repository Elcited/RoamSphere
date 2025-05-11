import styled from "styled-components";
import extractTransitTypes from "../utils/extractTransitTypes";
import extractBusTimeTips from "../utils/extractBusTimeTips";
import calculateTransitDurations from "../utils/calculateTransitDurations";
import TransitRouteSteps from "./TransitRouteSteps";
import TransitDurationBreakdown from "./TransitDurationBreakdown";
import TransitFee from "./TransitFee";

const RouteInfoOverview = styled.div`
  padding: 0.9rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;
`;

const RouteInfoOverviewItem = styled.div`
  display: flex;
  justify-content: center;
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

function TransitRouteInfoOverview({
  distance,
  duration,
  nightflag,
  transitFee,
  transitSteps,
}) {
  const transitTypes = extractTransitTypes(transitSteps);
  const transitTimetips = extractBusTimeTips(transitSteps);
  const transitBreakDownDurations = calculateTransitDurations(transitSteps);

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
          <TransitRouteSteps transitTypes={transitTypes} />
        </RouteInfoOverviewItem>
        <RouteInfoOverviewItem>
          <TransitFee transitFee={transitFee} />
          <TransitDurationBreakdown
            transitBreakDownDurations={transitBreakDownDurations}
          />
        </RouteInfoOverviewItem>
      </RouteInfoOverview>
    </div>
  );
}

export default TransitRouteInfoOverview;
