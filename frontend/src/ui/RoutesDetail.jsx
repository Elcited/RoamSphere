import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet } from "react-router-dom";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";

const Container = styled.div`
  width: 100%;
  padding: 1.2rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`;

const CloseButtonBox = styled.div`
  padding: 0.9rem;
  display: flex;
  justify-content: flex-end;
`;

function RoutesDetail() {
  const dispatch = useDispatch();

  return (
    <Container>
      <CloseButtonBox>
        <IconButton onClick={() => dispatch(setIsRoutesDrawerOpen(false))}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </CloseButtonBox>
      <Outlet />
      {/* {location.state === "fromHomePage" || isClickNavigation ? (
        <Outlet />
      ) : (
        <>
          <RoutesDetailHeader />

          <RoutesInfoBox>
            <h3>路线推荐</h3>
            {strategyList.map(s => (
              <RouteInfoCard
                key={s.strategy}
                title={s.title}
                desc={s.desc}
                newStrategy={s.strategy}
              />
            ))}
          </RoutesInfoBox>

          <OtherTrafficOptsBox>
            <OtherTrafficOption>公交车</OtherTrafficOption>
            <OtherTrafficOption>步行</OtherTrafficOption>
            <OtherTrafficOption>骑行</OtherTrafficOption>
          </OtherTrafficOptsBox>
        </>
      )} */}
    </Container>
  );
}

export default RoutesDetail;
