import styled from "styled-components";
import {
  DirectionsWalk as DirectionsWalkIcon,
  DirectionsBus as DirectionsBusIcon,
  DirectionsSubway as DirectionsSubwayIcon,
  Train as TrainIcon,
  DirectionsRailway as DirectionsRailwayIcon,
  LocalTaxi as LocalTaxiIcon,
} from "@mui/icons-material";
import { TransitCardWrapper } from "./TransitCardWrapper";

const DurationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #555;
`;

const iconMap = {
  walking: <DirectionsWalkIcon />,
  bus: <DirectionsBusIcon />,
  subway: <DirectionsSubwayIcon />,
  cityRailway: <DirectionsRailwayIcon />,
  railway: <TrainIcon />,
  taxi: <LocalTaxiIcon />,
};

function TransitDurationBreakdown({ transitBreakDownDurations }) {
  if (
    !transitBreakDownDurations ||
    Object.keys(transitBreakDownDurations).length === 0
  )
    return null;

  return (
    <TransitCardWrapper>
      {Object.entries(transitBreakDownDurations).map(([type, time]) => (
        <DurationItem key={type}>
          {iconMap[type]}
          <span>{time}分钟</span>
        </DurationItem>
      ))}
    </TransitCardWrapper>
  );
}

export default TransitDurationBreakdown;
