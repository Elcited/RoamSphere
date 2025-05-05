import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AtmIcon from "@mui/icons-material/Atm";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useDispatch, useSelector } from "react-redux";
import { setAttractionCenterLocation } from "../features/attractions/attractionSlice";
import { setMapMode } from "../features/map/mapSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";
import { setHotelCenterLocation } from "../features/hotels/hotelSlice";
import {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionType,
} from "../features/positions/positionSlice";
import { setIsRouteRendered } from "../features/routeDetail/routeSlice";
import { useLocation } from "react-router-dom";
import useFallbackCenterLocation from "../hooks/useFallbackCenterLocation";
import store from "../store/store";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 55rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

const StyledIconButton = styled(Button)`
  min-width: 4rem;
  border-radius: 1.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-transform: none;

  &:hover {
    background-color: #f3f3f3 !important;
    transform: translateY(-1px);
  }

  svg {
    color: #333333;
  }
`;

const ButtonText = styled.p`
  font-size: 1.2rem;
  display: inline-block;
  font-weight: 700;
`;

function MapSearchButtons() {
  const [open, setOpen] = useState(false);
  const lastHandlerRef = useRef(null);
  const { useEndAsCenter } = useSelector(state => state.map);
  const location = useLocation();
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();
  const fallbackCenterLocation = useFallbackCenterLocation();

  const createHandler = useCallback(
    ({ mapModeValue, positionType, toPath }) => {
      return () => {
        dispatch(setIsRouteRendered(false));
        dispatch(setMapMode(mapModeValue));

        const isFromRoute = /routes|route_detail/.test(location.pathname);
        const from = isFromRoute ? "fromRoute" : "fromOthers";
        const state = { fromRoute: isFromRoute };

        const currentUseEndAsCenter = store.getState().map.useEndAsCenter;
        const currentCenterLocation =
          store.getState().map.currentCenterLocation;
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

        setOpen(false);
      };
    },
    [
      dispatch,
      fallbackCenterLocation,
      location.pathname,
      updateQueryAndNavigate,
    ]
  );

  const buttonConfigs = useMemo(
    () => [
      {
        key: "attraction",
        label: "景点",
        icon: <AttractionsIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "attraction",
          toPath: "/map/attractions",
        }),
      },
      {
        key: "hotel",
        label: "酒店",
        icon: <HotelIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "hotel",
          toPath: "/map/hotels",
        }),
      },
      {
        key: "restaurant",
        label: "餐厅",
        icon: <RestaurantIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "position",
          positionType: "050100",
          toPath: "/map/positions",
        }),
      },
      {
        key: "gas",
        label: "加油站",
        icon: <LocalGasStationIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "position",
          positionType: "010100",
          toPath: "/map/positions",
        }),
      },
      {
        key: "atm",
        label: "ATM机",
        icon: <AtmIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "position",
          positionType: "160300",
          toPath: "/map/positions",
        }),
      },
      {
        key: "pharmacy",
        label: "药店",
        icon: <MedicationIcon fontSize="large" />,
        handler: createHandler({
          mapModeValue: "position",
          positionType: "090601",
          toPath: "/map/positions",
        }),
      },
    ],
    [createHandler]
  );

  useEffect(() => {
    if (lastHandlerRef.current) {
      lastHandlerRef.current();
    }
  }, [useEndAsCenter]);

  return (
    <Container>
      {buttonConfigs.map(item => (
        <StyledIconButton
          key={item.key}
          onClick={() => {
            item.handler();
            lastHandlerRef.current = item.handler;
          }}
          color="inherit"
          variant="contained"
        >
          {item.icon}
          <ButtonText>{item.label}</ButtonText>
        </StyledIconButton>
      ))}
    </Container>
  );
}

export default MapSearchButtons;
