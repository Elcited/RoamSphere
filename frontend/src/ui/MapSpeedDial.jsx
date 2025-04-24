import { useState } from "react";
import styled from "styled-components";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HotelIcon from "@mui/icons-material/Hotel";
import AtmIcon from "@mui/icons-material/Atm";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useDispatch, useSelector } from "react-redux";
import { setAttractionCenterLocation } from "../features/attractions/attractionSlice";
import { setIsSearchPanelExpand, setMapMode } from "../features/map/mapSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";
import { setHotelCenterLocation } from "../features/hotels/hotelSlice";
import {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionType,
} from "../features/positions/positionSlice";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 55rem;
  z-index: 1000;
`;

function MapSpeedDial() {
  const [open, setOpen] = useState(false);
  const { end } = useSelector(store => store.routeDetail);
  const { isSearchPanelExpand } = useSelector(store => store.map);
  const dispatch = useDispatch();

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleFindAttraction = () => {
    dispatch(setMapMode("attraction"));
    dispatch(setAttractionCenterLocation(end));
    dispatch(setIsSearchPanelExpand(true));

    updateQueryAndNavigate(
      {
        attractionCenterLocation: end,
        mapmode: "attraction",
        startLocation: null,
        endLocation: null,
      },
      "/map/attractions",
      { state: "fromRoute" }
    );

    setOpen(false);
  };

  const handleFindHotels = () => {
    dispatch(setMapMode("hotel"));
    dispatch(setHotelCenterLocation(end));

    updateQueryAndNavigate(
      {
        attractionCenterLocation: null,
        positionCenterLocation: null,
        hotelCenterLocation: end,
        mapmode: "hotel",
        startLocation: null,
        endLocation: null,
      },
      "/map/hotels",
      { state: "fromRoute" }
    );

    setOpen(false);
  };

  const handleFindGasStation = () => {
    dispatch(setMapMode("position"));
    dispatch(setPositionKeyWord(null));
    dispatch(setPositionCenterLocation(end));
    dispatch(setPositionType("010100"));

    updateQueryAndNavigate(
      {
        positionCenterLocation: end,
        attractionCenterLocation: null,
        hotelCenterLocation: null,
        mapmode: "position",
        startLocation: null,
        endLocation: null,
      },
      "/map/positions",
      { state: "fromRoute" }
    );

    setOpen(false);
  };

  const handleFindATM = () => {
    dispatch(setMapMode("position"));
    dispatch(setPositionKeyWord(null));
    dispatch(setPositionCenterLocation(end));
    dispatch(setPositionType("160300"));

    updateQueryAndNavigate(
      {
        positionCenterLocation: end,
        attractionCenterLocation: null,
        hotelCenterLocation: null,
        mapmode: "position",
        startLocation: null,
        endLocation: null,
      },
      "/map/positions",
      { state: "fromRoute" }
    );

    setOpen(false);
  };

  return (
    <Container>
      <SpeedDial
        ariaLabel="SpeedDial controlled"
        icon={<SpeedDialIcon open={open} />}
        onClick={handleToggle}
        open={open}
        direction="right"
      >
        <SpeedDialAction
          key="景点"
          icon={<AttractionsIcon sx={{ fontSize: 30 }} />}
          tooltipTitle="景点"
          onClick={handleFindAttraction}
        />

        <SpeedDialAction
          key="酒店"
          icon={<HotelIcon sx={{ fontSize: 30 }} />}
          tooltipTitle="酒店"
          onClick={handleFindHotels}
        />

        <SpeedDialAction
          key="加油站"
          icon={<LocalGasStationIcon sx={{ fontSize: 30 }} />}
          tooltipTitle="加油站"
          onClick={handleFindGasStation}
        />

        <SpeedDialAction
          key="ATM机"
          icon={<AtmIcon sx={{ fontSize: 30 }} />}
          tooltipTitle="ATM机"
          onClick={handleFindATM}
        />
      </SpeedDial>
    </Container>
  );
}

export default MapSpeedDial;
