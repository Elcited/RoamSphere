import styled from "styled-components";
import NorthIcon from "@mui/icons-material/North";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import SouthIcon from "@mui/icons-material/South";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const Container = styled.div`
  padding: 0.9rem;
`;

function renderIcon(orientation) {
  switch (orientation) {
    case "北":
      return <NorthIcon />;
    case "南":
      return <SouthIcon />;
    case "东":
      return <EastIcon />;
    case "西":
      return <WestIcon />;
    case "东北":
      return <NorthEastIcon />;
    case "东南":
      return <SouthEastIcon />;
    case "西北":
      return <NorthWestIcon />;
    case "西南":
      return <SouthWestIcon />;
    default:
      return <QuestionMarkIcon />;
  }
}

const RouteDirectionIcon = ({ orientation }) => {
  return <Container>{renderIcon(orientation)}</Container>;
};

export default RouteDirectionIcon;
