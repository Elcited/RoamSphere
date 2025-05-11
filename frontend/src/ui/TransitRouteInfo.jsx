import TransitRouteInfoBody from "./TransitRouteInfoBody";
import TransitRouteInfoHeader from "./TransitRouteInfoHeader";
import TransitRouteInfoOverview from "./TransitRouteInfoOverview";
import useGetRouteInfo from "../hooks/useGetRouteInfo";
import getTransitSelectedRouteFields from "../utils/getTransitSelectedRouteFields";

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

  console.log("transitSteps", transitSteps);

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
