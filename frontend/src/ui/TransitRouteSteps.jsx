import styled from "styled-components";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { transitColorMap } from "../utils/transitColors";

const StepRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  color: #555;
`;

const NameTag = styled.span`
  background-color: ${({ type }) =>
    transitColorMap[type] || transitColorMap.default};
  color: white;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  line-height: 1;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 0.8rem;
`;

const iconMap = {
  walking: <DirectionsWalkIcon />,
  bus: <DirectionsBusIcon />,
  subway: <DirectionsSubwayIcon />,
  train: <TrainIcon />,
  cityRailway: <DirectionsRailwayIcon />,
  taxi: <LocalTaxiIcon />,
};

function TransitRouteSteps({ transitTypes }) {
  return (
    <StepRow>
      {transitTypes.map(({ type, name }, index) => (
        <StepItem key={`${type}-${index}`}>
          {iconMap[type] || null}
          {name && <NameTag type={type}>{name}</NameTag>}
          {index < transitTypes.length - 1 && (
            <Arrow>
              <ArrowForwardIosIcon fontSize="small" />
            </Arrow>
          )}
        </StepItem>
      ))}
    </StepRow>
  );
}

export default TransitRouteSteps;
