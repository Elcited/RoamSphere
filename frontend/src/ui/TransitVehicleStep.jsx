import { useEffect, useState } from "react";
import styled from "styled-components";
import formatDuration from "../utils/formatDuration";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import startIcon from "../assets/images/transit/waypoint_start.png";
import extractTimeRange from "../utils/extractTimeRange";
import TransitTimeRangeInfo from "./TransitTimeRangeInfo";
import { transitColorMap } from "../utils/transitColors";
import extractBusTimeTips from "../utils/extractBusTimeTips";

const BoxContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`;

const LeftTextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
  gap: 1.2rem;
  font-size: 1.1rem;
`;

const TimeLineBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RightBox = styled.div`
  flex: 3;
  display: grid;
  grid-template-columns: 24px 1fr;
  position: relative;
  padding-left: 4px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 8px;
    background-color: ${({ color }) => color || "#ccc"};
    border-radius: 3px;
  }
`;

const BarColumn = styled.div`
  position: relative;
  width: 24px;
`;

const Icon = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const TopIcon = styled(Icon)`
  background-image: url(${startIcon});
  top: -8px;
`;

const BottomIcon = styled(Icon)`
  background-image: url(${startIcon});
  bottom: -8px;
`;

const DotContentBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #ddd;
`;

const StopName = styled.h3`
  padding: 0.9rem 0;
  margin: 0;
  font-weight: 600;
  color: #333;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const StopInfo = styled.div`
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.6rem 0;
`;

const LineName = styled.h3`
  margin: 0.2rem 0;
  font-weight: 600;
  color: #555;

  &::after {
    content: attr(tip);
    display: ${({ tip }) => (tip ? "inline-block" : "none")};
    background-color: ${({ color }) => color || "#eee"};
    color: #eee;
    font-size: 12px;
    padding: 6px;
    border-radius: 4px;
    white-space: nowrap;
    line-height: 1;
    font-weight: 500;
  }
`;

const InfoTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const ExpandIcon = styled(ExpandMoreIcon)`
  font-size: 1rem;
  transform: ${({ expanded }) =>
    expanded ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease;
`;

const StopsList = styled.div`
  padding-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StopItem = styled.div`
  font-size: 0.9rem;
  color: #555;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background-color: ${({ color }) => color || "#ccc"};
    border-radius: 50%;
  }
`;

function TransitVehicleStep({ data = {}, type = "bus" }) {
  console.log(data);
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const transitTimeRange = extractTimeRange(data);
  const transitTimeTip = extractBusTimeTips(data);
  const currentData =
    type === "taxi" || type === "railway"
      ? data
      : data
      ? data[selectedIndex]
      : {};
  const currentTip =
    type === "taxi" || type === "railway"
      ? transitTimeTip
      : transitTimeTip[selectedIndex];
  const color = transitColorMap[type] || transitColorMap.default;
  console.log("transitTimeRange", transitTimeRange);
  console.log("transitTimeTip", transitTimeTip);

  const iconMap = {
    bus: <DirectionsBusIcon fontSize="large" />,
    subway: <DirectionsSubwayIcon fontSize="large" />,
    train: <TrainIcon fontSize="large" />,
    cityRailway: <DirectionsRailwayIcon fontSize="large" />,
    taxi: <LocalTaxiIcon fontSize="large" />,
  };

  const departureStopName = currentData?.departureStop?.name || "未知起点";
  const arrivalStopName = currentData?.arrivalStop?.name || "未知终点";
  const duration = currentData?.duration
    ? formatDuration(currentData.duration)
    : "加载中...";
  const viaStops = Array.isArray(currentData?.viaStops)
    ? currentData.viaStops
    : [];
  const viaNumbers =
    typeof currentData?.viaNumbers === "number"
      ? currentData.viaNumbers
      : viaStops.length;
  const lineName = currentData?.name || "未知线路";
  const vehicleType = currentData?.type || "未知类型";

  /* 在选中的路线变化时，自动关闭展开列表 */
  useEffect(() => {
    setExpanded(false);
  }, [selectedIndex]);

  return (
    <BoxContainer>
      <LeftTextBox>
        {iconMap[type] || iconMap["bus"]}
        <TimeLineBox>
          {transitTimeRange && (type !== "taxi" || type !== "railway") ? (
            transitTimeRange.map((time, index) => (
              <TransitTimeRangeInfo
                key={`${time.timeRange}-${index}`}
                timeRange={time.timeRange}
                index={index}
                color={color}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            ))
          ) : (
            <div>正在加载时间信息...</div>
          )}
        </TimeLineBox>
      </LeftTextBox>
      <RightBox color={color}>
        <BarColumn>
          <TopIcon />
          <BottomIcon />
        </BarColumn>
        <DotContentBox>
          <StopName>{departureStopName || data.startName}</StopName>
          <StopInfo>
            <LineName tip={currentTip || ""} color={color}>
              {lineName}
            </LineName>
            <InfoTextWrapper onClick={() => setExpanded(e => !e)}>
              <InfoText>
                {duration}（{viaNumbers || "直达"}站）• {vehicleType}
              </InfoText>
              {viaNumbers ? <ExpandIcon expanded={expanded} /> : null}
            </InfoTextWrapper>
            {viaStops.length > 0 && (
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <StopsList>
                  {viaStops.map((stop, index) => (
                    <StopItem color={color} key={index}>
                      {stop?.name || "未知站点"}
                    </StopItem>
                  ))}
                </StopsList>
              </Collapse>
            )}
          </StopInfo>
          <StopName>{arrivalStopName || data.endName}</StopName>
        </DotContentBox>
      </RightBox>
    </BoxContainer>
  );
}

export default TransitVehicleStep;
