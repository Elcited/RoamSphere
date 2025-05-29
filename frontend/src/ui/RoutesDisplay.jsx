import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import RoutesDisplayItem from "./RoutesDisplayItem";
import useGetRouteInfo from "../hooks/useGetRouteInfo";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-height: 200px;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #777;
`;

const LoadingWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

function RoutesDisplay() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { travelMode, isRoutesLoading } = useSelector(store => store.route);
  const { routesInfo } = useGetRouteInfo(travelMode);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(clearCyclingRoute());
  //   dispatch(clearTransitRoute());
  //   dispatch(clearDrivingRoute());
  //   dispatch(clearWalkingRoute());
  // }, []);

  // 提取起点信息，兼容为空的情况
  const startPaths =
    routesInfo?.map(
      route =>
        route?.startInfo?.regeocode?.addressComponent?.streetNumber?.street ||
        ""
    ) ?? [];

  if (isRoutesLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress color="primary" />
      </LoadingWrapper>
    );
  }

  if (!routesInfo || routesInfo.length === 0) {
    return <EmptyState>暂无可用路线</EmptyState>;
  }

  return (
    <Container>
      {travelMode === "transit" ? (
        routesInfo[0]?.plans?.length > 0 ? (
          routesInfo[0].plans.map((plan, index) => (
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
        ) : (
          <EmptyState>暂无可用路线</EmptyState>
        )
      ) : (
        routesInfo.map((route, index) => (
          <RoutesDisplayItem
            key={route.strategy || index}
            index={index}
            routeInfo={route}
            travelMode={travelMode}
            startPath={startPaths[index]}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))
      )}
    </Container>
  );
}

export default RoutesDisplay;
