import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RoutesDetailHeader from "./RoutesDetailHeader";
import RouteInfoCard from "./RouteInfoCard";
import { Outlet, useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 1.2rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const OtherTrafficOptsBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
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
      {location.state === "fromHomePage" || isClickNavigation ? (
        <Outlet />
      ) : (
        <>
          <RoutesDetailHeader />
          <OtherTrafficOptsBox>
            <OtherTrafficOption>公交车</OtherTrafficOption>
            <OtherTrafficOption>步行</OtherTrafficOption>
            <OtherTrafficOption>骑行</OtherTrafficOption>
          </OtherTrafficOptsBox>

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
        </>
      )}
    </Container>
  );
}

export default RoutesDetail;
