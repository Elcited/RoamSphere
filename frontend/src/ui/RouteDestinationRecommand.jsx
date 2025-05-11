import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import useQueryUpdater from "../hooks/useQueryUpdater";
import store from "../store/store";
import { setIsRouteRendered } from "../features/routeDetail/routeSlice";
import { setMapMode } from "../features/map/mapSlice";
import { setAttractionCenterLocation } from "../features/attractions/attractionSlice";
import { setHotelCenterLocation } from "../features/hotels/hotelSlice";
import {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionType,
} from "../features/positions/positionSlice";
import useFallbackCenterLocation from "../hooks/useFallbackCenterLocation";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: #fff;
`;

const Header = styled.h1`
  padding: 1.2rem;
`;

const IconButtonBox = styled.div`
  display: flex;
  padding: 1.2rem;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.span`
  display: inline-block;
  margin-top: 0.3rem;
  font-weight: 600;
`;

function RouteDestinationRecommand() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { end } = useSelector(store => store.route);
  const fallbackCenterLocation = useFallbackCenterLocation();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleClick = ({ mapModeValue, positionType, toPath }) => {
    dispatch(setIsRouteRendered(false));
    dispatch(setMapMode(mapModeValue));

    const isFromRoute = /routes|route_detail/.test(location.pathname);
    const from = isFromRoute ? "fromRoute" : "fromOthers";
    const state = { fromRoute: isFromRoute };

    const currentUseEndAsCenter = store.getState().map.useEndAsCenter;
    const currentCenterLocation = store.getState().map.currentCenterLocation;
    const centerLocation = currentUseEndAsCenter
      ? currentCenterLocation
      : fallbackCenterLocation;

    if (mapModeValue === "attraction") {
      dispatch(setAttractionCenterLocation(centerLocation));
    } else if (mapModeValue === "hotel") {
      dispatch(setHotelCenterLocation(centerLocation));
    } else if (mapModeValue === "position") {
      dispatch(setPositionCenterLocation(centerLocation));
      dispatch(setPositionKeyWord(null));
      dispatch(setPositionType(positionType));
    }

    updateQueryAndNavigate(
      {
        ...(mapModeValue === "attraction" && {
          attractionCenterLocation: centerLocation,
        }),
        ...(mapModeValue === "hotel" && {
          hotelCenterLocation: centerLocation,
        }),
        ...(mapModeValue === "position" && {
          positionCenterLocation: centerLocation,
        }),
        mapmode: mapModeValue,
        from,
      },
      toPath,
      { replace: true, state, clearOthers: true }
    );
  };

  const IconButtonConfigs = useMemo(
    () => [
      {
        key: "restaurant",
        label: "餐厅",
        icon: <RestaurantIcon fontSize="large" />,
        mapModeValue: "position",
        positionType: "050100",
        toPath: "/map/positions",
      },
      {
        key: "hotel",
        label: "酒店",
        icon: <HotelIcon fontSize="large" />,
        mapModeValue: "hotel",
        toPath: "/map/hotels",
      },
      {
        key: "parking",
        label: "停车场",
        icon: <LocalParkingIcon fontSize="large" />,
        mapModeValue: "position",
        positionType: "150700",
        toPath: "/map/positions",
      },
      {
        key: "gasStation",
        label: "加油站",
        icon: <LocalGasStationIcon fontSize="large" />,
        mapModeValue: "position",
        positionType: "010100",
        toPath: "/map/positions",
      },
      {
        key: "more",
        label: "更多",
        icon: <MoreHorizIcon fontSize="large" />,
        mapModeValue: "position",
        toPath: "/map/positions",
      },
    ],
    []
  );

  return (
    <Container>
      <Header>探索{end}周边</Header>
      <IconButtonBox>
        {IconButtonConfigs.map(icon => (
          <Button
            key={icon.key}
            onClick={() =>
              handleClick({
                mapModeValue: icon.mapModeValue,
                positionType: icon.positionType,
                toPath: icon.toPath,
              })
            }
          >
            <IconButton>{icon.icon}</IconButton>
            <ButtonText>{icon.label}</ButtonText>
          </Button>
        ))}
      </IconButtonBox>
    </Container>
  );
}

export default RouteDestinationRecommand;
