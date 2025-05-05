import styled from "styled-components";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

function RouteDisplayItemIcon({ travelMode }) {
  if (travelMode === "driving") return <TimeToLeaveIcon fontSize="large" />;
  if (travelMode === "transit")
    return <DirectionsTransitIcon fontSize="large" />;
  if (travelMode === "cycling") return <DirectionsBikeIcon fontSize="large" />;
  if (travelMode === "walking") return <DirectionsWalkIcon fontSize="large" />;
}

export default RouteDisplayItemIcon;
