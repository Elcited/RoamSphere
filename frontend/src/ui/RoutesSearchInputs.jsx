import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CloseIcon from "@mui/icons-material/Close";
import {
  setEnd,
  setStart,
  setStartEndEmpty,
  setStrategy,
  setTravelMode,
} from "../features/routeDetail/routeSlice";
import { setSearchPanelExpanded } from "../features/search/searchSlice";
import SearchInput from "./SearchInput";
import {
  setClickedLngLat,
  setCurrentCenterLocation,
  setHasRouteEnd,
  setMapMode,
  setUseEndAsCenter,
} from "../features/map/mapSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";
import useInputWithAmapTips from "../hooks/useInputWithAmapTips";
import useAutoFillInputFromClick from "../features/routeDetail/useAutoFillInputFromClick";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
  gap: 1.2rem;
  background-color: #fff;
  padding-bottom: 1.2rem;

  position: sticky;
  top: 0;
  z-index: 10; /* 保证它在其他元素之上 */
  background-color: #fff; /* 必须有背景色，否则下面内容会透出来 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  font-size: 2.4rem;
`;

const IconButtonBox = styled.button`
  all: unset;
  background-color: ${({ $selected }) =>
    $selected ? "#e0f7fa" : "transparent"};
  color: ${({ $selected }) => ($selected ? "#1976d2" : "inherit")};
  border: ${({ $selected }) => ($selected ? "2px solid #a3c8ed" : "none")};
  border-radius: 50%;
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e8f1fb;
  }

  svg {
    font-size: 2.4rem;
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
  const travelMode = useSelector(state => state.route.travelMode);
  const { updateQueryAndNavigate } = useQueryUpdater();

  const dispatch = useDispatch();

  const currentInputRef = useRef(null); // 当前激活输入框
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  useAutoFillInputFromClick({ currentInputRef });

  const { value: startValue, onChange: onStartChange } = useInputWithAmapTips(
    startInputRef,
    start,
    val => dispatch(setStart(val))
  );

  const { value: endValue, onChange: onEndChange } = useInputWithAmapTips(
    endInputRef,
    end,
    val => dispatch(setEnd(val))
  );

  const [selectedMode, setSelectedMode] = useState("");

  const handleChangeTravelMode = id => {
    dispatch(setTravelMode(id));
    setSelectedMode(id);
    updateQueryAndNavigate({ travelMode: id });
    if (id !== "driving") dispatch(setStrategy("0"));
    else dispatch(setStrategy("0,1,2"));
  };

  const handleSwap = () => {
    dispatch(setStart(end));
    dispatch(setEnd(start));
    dispatch(clearDrivingRoute());
    dispatch(clearCyclingRoute());
    dispatch(clearWalkingRoute());
    dispatch(clearTransitRoute());
  };

  const handleFocus = type => {
    currentInputRef.current = type; // 'start' 或 'end'
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
    if (!travelMode) {
      dispatch(setTravelMode("driving"));
      dispatch(setStrategy("0,1,2"));
    }
  }, [travelMode]);

  useEffect(() => {
    if (!start) {
      currentInputRef.current = "start";
    } else if (!end) {
      currentInputRef.current = "end";
    } else {
      currentInputRef.current = null; // 两个都填了，就不自动填了
    }
  }, [start, end]);

  useEffect(() => {
    // 当 start 和 end 都被选择后，设置 strategy
    if (start && end) {
      if (travelMode === "driving") {
        dispatch(setStrategy("0,1,2"));
      } else {
        dispatch(setStrategy("0")); // 其他模式默认策略
      }
      dispatch(setUseEndAsCenter(true));
      // dispatch(setHasRouteEnd(end));
      dispatch(setCurrentCenterLocation(end));
    }
  }, [start, end, travelMode, dispatch]);

  useEffect(() => {
    return () => {
      currentInputRef.current = null;
    };
  }, []);

  return (
    <Container>
      <Header>
        <TravelModeBox>
          {TravelModeButtonConfigs.map(config => (
            <IconButtonBox
              key={config.id}
              onClick={() => handleChangeTravelMode(config.id)}
              $selected={travelMode === config.id}
            >
              {config.button}
            </IconButtonBox>
          ))}
          <CloseButtonBox>
            <IconButtonBox
              onClick={() => {
                dispatch(setSearchPanelExpanded(false));
                dispatch(setMapMode("position"));
                dispatch(setStartEndEmpty());
                dispatch(setMapMode(null));
                dispatch(setTravelMode(null));
                dispatch(setClickedLngLat(null));
                dispatch(setHasRouteEnd(false));
                dispatch(clearDrivingRoute());
                dispatch(clearCyclingRoute());
                dispatch(clearWalkingRoute());
                dispatch(clearTransitRoute());
                currentInputRef.current = null;
                updateQueryAndNavigate({}, "/map", {
                  clearOthers: true,
                });
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButtonBox>
          </CloseButtonBox>
        </TravelModeBox>
        <InputsAndButtonBox>
          <InputsBox>
            <SearchInput
              value={startValue}
              onChange={onStartChange}
              placeholder="选择起点，或者地图上点击一个地点"
              inputRef={startInputRef}
              onFocus={() => handleFocus("start")}
              currentInputRef={currentInputRef}
              type="start"
            />
            <SearchInput
              value={endValue}
              onChange={onEndChange}
              placeholder="选择终点，或者地图上点击一个地点"
              inputRef={endInputRef}
              onFocus={() => handleFocus("end")}
              currentInputRef={currentInputRef}
              type="end"
            />
          </InputsBox>
          <IconButtonBox onClick={handleSwap}>
            <ImportExportIcon fontSize="large" />
          </IconButtonBox>
        </InputsAndButtonBox>
      </Header>
    </Container>
  );
}

export default RoutesSearchInputs;
