import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CloseIcon from "@mui/icons-material/Close";
import {
  setEnd,
  setStart,
  setStrategy,
  setTravelMode,
} from "../features/routeDetail/routeSlice";
import useAMapLoader from "../hooks/useAMapLoader";
import useQueryUpdater from "../hooks/useQueryUpdater";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";
import SearchInput from "./SearchInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  gap: 1.2rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  font-size: 2.4rem;
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${({ selected }) => (selected ? "#e0f7fa" : "transparent")};
  color: ${({ selected }) => (selected ? "#00796b" : "inherit")};
  border: ${({ selected }) => (selected ? "2px solid #00796b" : "none")};
  transition: all 0.3s;

  &:hover {
    background-color: #b2dfdb;
  }
`;

const TravelModeBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 3.6rem;
`;

const InputsAndButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-size: 2.4rem;
`;

const CloseButtonBox = styled.div`
  margin-left: auto;
`;

function RoutesSearchInputs() {
  const { start, end, strategy } = useSelector(store => store.route);
  const { data: AMap, isSuccess, isLoading } = useAMapLoader();
  const dispatch = useDispatch();

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState("");

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleChangeTravelMode = id => {
    dispatch(setTravelMode(id));
    setSelectedMode(id);
    if (id !== "driving") dispatch(setStrategy("0"));
    else dispatch(setStrategy("0,1,2"));
  };

  const debouncedSetStart = useDebouncedCallback(
    value => dispatch(setStart(value)),
    600
  );

  const debouncedSetEnd = useDebouncedCallback(
    value => dispatch(setEnd(value)),
    600
  );

  const handleSwap = () => {
    dispatch(setStart(end));
    dispatch(setEnd(start));
  };

  const TravelModeButtonConfigs = [
    {
      id: "driving",
      button: <TimeToLeaveIcon fontSize="large" />,
    },
    {
      id: "transit",
      button: <DirectionsTransitIcon fontSize="large" />,
    },
    {
      id: "cycling",
      button: <DirectionsBikeIcon fontSize="large" />,
    },
    {
      id: "walking",
      button: <DirectionsWalkIcon fontSize="large" />,
    },
  ];

  useEffect(() => {
    if (!isSuccess || !AMap || !startInputRef.current) return;
    AMap.plugin("AMap.AutoComplete", () => {
      new AMap.AutoComplete({
        input: startInputRef.current,
      });
    });
  }, [start, startInputRef, isSuccess]);

  useEffect(() => {
    if (!isSuccess || !AMap || !endInputRef.current) return;
    AMap.plugin("AMap.AutoComplete", () => {
      new AMap.AutoComplete({
        input: endInputRef.current,
      });
    });
  }, [end, endInputRef, isSuccess]);

  return (
    <Container>
      <Header>
        <TravelModeBox>
          {TravelModeButtonConfigs.map(config => (
            <StyledIconButton
              key={config.id}
              onClick={() => handleChangeTravelMode(config.id)}
              selected={selectedMode === config.id}
            >
              {config.button}
            </StyledIconButton>
          ))}
          <CloseButtonBox>
            <IconButton onClick={() => dispatch(setIsRoutesDrawerOpen(false))}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </CloseButtonBox>
        </TravelModeBox>
        <InputsAndButtonBox>
          <InputsBox>
            <SearchInput
              value={start}
              onChange={debouncedSetStart}
              placeholder="选择起点，或者地图上点击一个地点"
              inputRef={startInputRef}
            />
            <SearchInput
              value={end}
              onChange={debouncedSetEnd}
              placeholder="选择终点，或者地图上点击一个地点"
              inputRef={endInputRef}
            />
          </InputsBox>
          <IconButton onClick={handleSwap}>
            <ImportExportIcon fontSize="large" />
          </IconButton>
        </InputsAndButtonBox>
      </Header>
    </Container>
  );
}

export default RoutesSearchInputs;
