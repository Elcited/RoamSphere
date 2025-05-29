import styled from "styled-components";
import RouteDisplayItemIcon from "./RouteDisplayItemIcon";
import { setDrivingSelectedRoute } from "../features/drivingRoute/drivingRouteSlice";
import { setTransitSelectedRoute } from "../features/transitRoute/transitRouteSlice";
import { setCyclingSelectedRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { setWalkingSelectedRoute } from "../features/walkingRoute/walkingRouteSlice";
import { useDispatch } from "react-redux";
import useQueryUpdater from "../hooks/useQueryUpdater";
import useGetRouteInfo from "../hooks/useGetRouteInfo";
import useWalkTypeDescription from "../hooks/useWalkTypeDescription";
import getTransitSelectedRouteFields from "../utils/getTransitSelectedRouteFields";
import extractTransitTypes from "../utils/extractTransitTypes";
import TransitRouteSteps from "./TransitRouteSteps";
import getSimpleSelectedRouteFields from "../utils/getSimpleSelectedRouteFields";
import summarizeTrafficStatus from "../utils/summarizeTrafficStatus";
import SummarizedRouteStatus from "./SummarizedRouteStatus";

const Container = styled.div`
  color: #444;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid #e3e3e3;
  position: relative;
  padding: 0.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #1976d2;
    border-radius: 2px;
  }
`;

const RouteInfoOverviewBox = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const RouteInfoBox = styled.div`
  display: flex;
  gap: 4.8rem;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
`;

const RouteInfoIcon = styled.div`
  padding: 0.9rem;
`;

const RightBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  justify-items: center;
`;

const GridItem = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  &:last-child {
    justify-self: start;
  }
`;

const PathText = styled.div`
  color: #444;
  font-size: 1.8rem;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TimeItem = styled.span`
  display: inline-block;
  color: ${({ duration }) =>
    +duration.slice(0, 2) <= 20 ? "#27ae60" : "#444"};
`;

const DistanceItem = styled.span`
  display: inline-block;
`;

const DetailButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailButton = styled.button`
  padding: 0.9rem;
  background-color: transparent;
  border: none;
  color: #1976d2;
`;

function RoutesDisplayItem({
  routeInfo,
  index,
  travelMode,
  startPath,
  selectedIndex,
  setSelectedIndex,
}) {
  const { distance, duration, nightflag } = routeInfo;
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();
  const routeData = useGetRouteInfo(travelMode);
  const { routeRoadStatus, routeWalkTypes } = getSimpleSelectedRouteFields(
    routeData,
    index
  );
  const summarizedStatus = summarizeTrafficStatus(routeRoadStatus, travelMode);
  const walkDescription = useWalkTypeDescription(routeWalkTypes);
  const { transitSteps } = getTransitSelectedRouteFields(routeData, 0, index);
  const transitTypes = extractTransitTypes(transitSteps);

  const routeSettersByMode = {
    driving: setDrivingSelectedRoute,
    transit: setTransitSelectedRoute,
    cycling: setCyclingSelectedRoute,
    walking: setWalkingSelectedRoute,
  };

  const handleClick = (travelMode, index) => {
    dispatch(routeSettersByMode[travelMode](index));
    setSelectedIndex(index);
  };

  const handleButtonClick = () => {
    updateQueryAndNavigate(
      {
        travelMode,
      },
      "/map/routes/route_overview/route_detail",
      {}
    );
  };

  const isSelected = selectedIndex === index;

  return (
    <Container onClick={() => handleClick(travelMode, index)}>
      <RouteInfoOverviewBox>
        <RouteInfoBox>
          <LeftBox>
            <RouteInfoIcon>
              <RouteDisplayItemIcon travelMode={travelMode} />
            </RouteInfoIcon>
          </LeftBox>
          <RightBox>
            <GridItem>
              <PathText>
                <span>途径{startPath}</span>
                {travelMode !== "transit" && (
                  <SummarizedRouteStatus
                    summarizedStatus={summarizedStatus}
                    walkDescription={walkDescription}
                    travelMode={travelMode}
                  />
                )}
                <TransitRouteSteps transitTypes={transitTypes} />
              </PathText>
            </GridItem>
            <GridItem>
              <TimeItem duration={duration}>{duration}</TimeItem>
              <DistanceItem>{distance}</DistanceItem>
            </GridItem>
            <GridItem>
              {isSelected ? (
                <DetailButtonBox>
                  <div>
                    <DetailButton onClick={handleButtonClick}>
                      详情
                    </DetailButton>
                  </div>
                </DetailButtonBox>
              ) : null}
            </GridItem>
          </RightBox>
        </RouteInfoBox>
      </RouteInfoOverviewBox>
    </Container>
  );
}

export default RoutesDisplayItem;
