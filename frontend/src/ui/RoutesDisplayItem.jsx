import styled from "styled-components";
import RouteDisplayItemIcon from "./RouteDisplayItemIcon";
import { setDrivingSelectedRoute } from "../features/drivingRoute/drivingRouteSlice";
import { setTransitSelectedRoute } from "../features/transitRoute/transitRouteSlice";
import { setCyclingSelectedRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { setWalkingSelectedRoute } from "../features/walkingRoute/walkingRouteSlice";
import { useDispatch } from "react-redux";
import useQueryUpdater from "../hooks/useQueryUpdater";

const Container = styled.div`
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid #e3e3e3;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${props => props.highlightColor || "blue"};
    border-radius: 2px;
  }
`;

const RouteInfoOverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const RouteInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RouteInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.span`
  display: inline-block;
`;

const DetailButtonBox = styled.div`
  padding: 0.9rem;
  display: flex;
  justify-content: center;
`;

const DetailButton = styled.button`
  padding: 0.9rem;
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

  const routeSettersByMode = {
    driving: setDrivingSelectedRoute,
    transit: setTransitSelectedRoute,
    cycling: setCyclingSelectedRoute,
    walking: setWalkingSelectedRoute,
  };

  const handleClick = (travelMode, index) => {
    console.log(travelMode, index);
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
          <RouteInfoItem>
            <RouteDisplayItemIcon travelMode={travelMode} />
          </RouteInfoItem>
          <RouteInfoItem>
            <Item>
              <span>途经</span>
              <span>{startPath}</span>
            </Item>
            <Item>
              <span>{duration}</span>
              <span>（如果路途畅通）</span>
            </Item>
            <Item>{nightflag ? <span>夜班车</span> : null}</Item>
          </RouteInfoItem>
          <RouteInfoItem>
            <Item>{duration}</Item>
            <Item>{distance}</Item>
          </RouteInfoItem>
        </RouteInfoBox>
        {isSelected ? (
          <DetailButtonBox>
            <div>
              <DetailButton onClick={handleButtonClick}>详情</DetailButton>
            </div>
          </DetailButtonBox>
        ) : null}
      </RouteInfoOverviewBox>
    </Container>
  );
}

export default RoutesDisplayItem;
