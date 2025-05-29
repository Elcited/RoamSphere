import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setEnd,
  setStart,
  setStrategy,
  setTravelMode,
} from "../features/routeDetail/routeSlice";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`;

function RoutesDetail() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     // 组件卸载时清空输入和状态
  //     dispatch(setStart(""));
  //     dispatch(setEnd(""));
  //     dispatch(setTravelMode(null));
  //     dispatch(setStrategy(null));
  //     dispatch(clearDrivingRoute());
  //     dispatch(clearCyclingRoute());
  //     dispatch(clearWalkingRoute());
  //     dispatch(clearTransitRoute());
  //   };
  // }, []);
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default RoutesDetail;
