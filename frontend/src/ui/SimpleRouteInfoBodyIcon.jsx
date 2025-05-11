import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

function SimpleRouteInfoBodyIcon({ travelMode }) {
  const IconConfigs = {
    driving: <DirectionsCarIcon fontSize="large" />,
    walking: <DirectionsWalkIcon fontSize="large" />,
    cycling: <DirectionsBikeIcon fontSize="large" />,
  };

  return <span>{IconConfigs[travelMode]}</span>;
}

export default SimpleRouteInfoBodyIcon;
