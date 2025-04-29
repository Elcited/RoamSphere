import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setHawkEyeOpen,
  setCompassOpen,
  setScaleOpen,
  setZoomOpen,
} from "../features/map/mapSlice";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOffIcon from "@mui/icons-material/ExploreOff";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const Container = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
`;

function MapControlPanel() {
  const dispatch = useDispatch();
  const { hawkEyeOpen, scaleOpen, compassOpen, zoomOpen } = useSelector(
    store => store.map
  );

  const actions = [
    {
      icon: <ExploreIcon fontSize="large" />,
      name: "指南针",
      action: setCompassOpen,
      pre: compassOpen,
    },
    {
      icon: <ImportExportIcon fontSize="large" />,
      name: "比例尺",
      action: setScaleOpen,
      pre: scaleOpen,
    },
    {
      icon: <VisibilityIcon fontSize="large" />,
      name: "鹰眼窗口",
      action: setHawkEyeOpen,
      pre: hawkEyeOpen,
    },
    {
      icon: <ZoomOutMapIcon fontSize="large" />,
      name: "缩放控件",
      action: setZoomOpen,
      pre: zoomOpen,
    },
  ];

  const handleActionClick = (action, pre) => {
    dispatch(action(!pre));
  };

  return (
    <Container>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              console.log(`${action.name} clicked`);
              handleActionClick(action.action, action.pre);
            }}
          />
        ))}
      </SpeedDial>
    </Container>
  );
}

export default MapControlPanel;
