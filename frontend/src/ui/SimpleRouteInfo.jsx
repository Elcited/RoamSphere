import SimpleRouteInfoBody from "./SimpleRouteInfoBody";
import SimpleRouteInfoHeader from "./SimpleRouteInfoHeader";
import SimpleRouteInfoOverview from "./SimpleRouteInfoOverview";
import useGetRouteInfo from "../hooks/useGetRouteInfo";
import getSimpleSelectedRouteFields from "../utils/getSimpleSelectedRouteFields";

function SimpleRouteInfo({ travelMode, selectedRouteIndex }) {
  const routeData = useGetRouteInfo(travelMode);

  const {
    routeInfo,
    routeInstructions,
    routeNavigations,
    routeOrientations,
    routeRoadCities,
    routeRoadStatus,
    routeRoadDistance,
    routeWalkTypes,
    routeStepDistance,
  } = getSimpleSelectedRouteFields(routeData, selectedRouteIndex);

  if (!routeInfo || !routeInstructions) {
    return <div>🚧 正在加载路线详情，请稍候...</div>;
  }

  return (
    <div>
      <SimpleRouteInfoHeader routeInfo={routeInfo} />
      <SimpleRouteInfoOverview
        routeInfo={routeInfo}
        routeWalkTypes={routeWalkTypes}
      />
      <SimpleRouteInfoBody
        routeInfo={routeInfo}
        routeInstructions={routeInstructions}
        routeNavigations={routeNavigations}
        routeOrientations={routeOrientations}
        routeRoadCities={routeRoadCities}
        routeRoadStatus={routeRoadStatus}
        routeRoadDistance={routeRoadDistance}
        routeWalkTypes={routeWalkTypes}
        routeStepDistance={routeStepDistance}
        travelMode={travelMode}
      />
    </div>
  );
}

export default SimpleRouteInfo;
