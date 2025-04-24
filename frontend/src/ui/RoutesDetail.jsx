import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RoutesDetailHeader from "./RoutesDetailHeader";
import RouteInfoCard from "./RouteInfoCard";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet, useLocation } from "react-router-dom";
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

const OtherTrafficOptsBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const OtherTrafficOption = styled.div`
  width: 40rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 1rem;
`;

const RoutesInfoBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function RoutesDetail() {
  const dispatch = useDispatch();
  const { info, strategyList, isClickNavigation } = useSelector(
    store => store.routeDetail
  );
  const location = useLocation();

  if (!info) return <div>Loading...</div>;

  return (
    <Container>
      <CloseButtonBox>
        <IconButton onClick={() => dispatch(setIsRoutesDrawerOpen(false))}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </CloseButtonBox>
      {location.state === "fromHomePage" || isClickNavigation ? (
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
      )}
    </Container>
  );
}

export default RoutesDetail;
