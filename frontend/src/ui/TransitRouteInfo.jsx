import TransitRouteInfoBody from "./TransitRouteInfoBody";
import TransitRouteInfoHeader from "./TransitRouteInfoHeader";
import TransitRouteInfoOverview from "./TransitRouteInfoOverview";
import useGetRouteInfo from "../hooks/useGetRouteInfo";
import getTransitSelectedRouteFields from "../utils/getTransitSelectedRouteFields";
import { CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  color: #888;
`;

function TransitRouteInfo({ travelMode, selectedRouteIndex }) {
  const routeData = useGetRouteInfo(travelMode);

  const {
    startLocation,
    startInfo,
    endLocation,
    endInfo,
    distance,
    duration,
    nightflag,
    transitFee,
    transitSteps,
  } = getTransitSelectedRouteFields(routeData, 0, selectedRouteIndex);

  const isEmpty =
    !startLocation ||
    !endLocation ||
    !transitSteps ||
    transitSteps.length === 0;

  if (isEmpty) {
    return (
      <LoadingWrapper>
        <CircularProgress size={32} />
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          正在加载公交路线，请稍候...
        </Typography>
      </LoadingWrapper>
    );
  }

  return (
    <div>
      <TransitRouteInfoHeader
        startLocation={startLocation}
        startInfo={startInfo}
        endLocation={endLocation}
        endInfo={endInfo}
      />
      <TransitRouteInfoOverview
        distance={distance}
        duration={duration}
        nightflag={nightflag}
        transitFee={transitFee}
        transitSteps={transitSteps}
      />
      <TransitRouteInfoBody
        startLocation={startLocation}
        startInfo={startInfo}
        endLocation={endLocation}
        endInfo={endInfo}
        distance={distance}
        duration={duration}
        nightflag={nightflag}
        transitFee={transitFee}
        transitSteps={transitSteps}
      />
    </div>
  );
}

export default TransitRouteInfo;
