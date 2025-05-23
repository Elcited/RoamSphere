import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RoutesDisplayItem from "./RoutesDisplayItem";
import useGetRouteInfo from "../hooks/useGetRouteInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

function RoutesDisplay() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { travelMode, isRoutesLoading, isRoutesSuccess } = useSelector(
    store => store.route
  );

  const {
    routesInfo,
    routesPolylines,
    routesInstructions,
    routesRoadDistance,
    routesWalkTypes,
    routesStepDistance,
    rawSlice,
  } = useGetRouteInfo(travelMode);

  const startPaths = routesInfo.map(
    routeInfo =>
      routeInfo.startInfo.regeocode.addressComponent.streetNumber.street
  );

  if (isRoutesLoading) return <div>Data is Loading...</div>;

  return (
    <Container>
      {travelMode === "transit"
        ? routesInfo[0]?.plans?.map((plan, index) => (
            <RoutesDisplayItem
              key={plan.strategy || index}
              index={index}
              routeInfo={plan}
              travelMode={travelMode}
              startPath={startPaths[0]}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          ))
        : routesInfo.map((route, index) => (
            <RoutesDisplayItem
              key={route.strategy}
              index={index}
              routeInfo={route}
              travelMode={travelMode}
              startPath={startPaths[index]}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          ))}
    </Container>
  );
}

export default RoutesDisplay;
