import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Container = styled.div`
  background-color: #fff;
`;

const Header = styled.h1`
  padding: 1.2rem;
`;

const IconButtonBox = styled.div`
  display: flex;
  padding: 1.2rem;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonText = styled.span`
  display: inline-block;
`;

const IconButtonConfigs = [
  {
    key: "restaurant",
    label: "餐厅",
    button: <RestaurantIcon fontSize="large" />,
  },
  {
    key: "hotel",
    label: "酒店",
    button: <HotelIcon fontSize="large" />,
  },
  {
    key: "parking",
    label: "停车场",
    button: <LocalParkingIcon fontSize="large" />,
  },
  {
    key: "gasStation",
    label: "加油站",
    button: <LocalGasStationIcon fontSize="large" />,
  },
  {
    key: "more",
    label: "更多",
    button: <MoreHorizIcon fontSize="large" />,
  },
];

function RouteDestinationRecommand() {
  return (
    <Container>
      <Header>探索xxx周边</Header>
      <IconButtonBox>
        {IconButtonConfigs.map(icon => (
          <Button key={icon.key}>
            <IconButton>
              {icon.button}
              <ButtonText>{icon.label}</ButtonText>
            </IconButton>
          </Button>
        ))}
      </IconButtonBox>
    </Container>
  );
}

export default RouteDestinationRecommand;
