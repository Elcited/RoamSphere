import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { setIsClickNavigation } from "../features/routeDetail/routeDetailSlice";
import RouteDirectionIcon from "./RouteDirectionIcon";
import {
  calculateTotalRoadDistance,
  evaluateRoadStatus,
} from "../utils/routesHelpers";
import { useState } from "react";

const Container = styled.div`
  padding: 1.2rem;
  overflow-y: scroll;
`;

const RouteInfoHeader = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const StartToEndBox = styled.div`
  padding: 1.2rem;
`;

const RouteInfoBody = styled.div`
  width: 38rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
54;

const DetailBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.2rem;
  row-gap: 2.4rem;

  &:first-child {
    grid-column: 1 / -1;
  }
`;

const DetailItem = styled.div`
  padding: 0.9rem;
`;

const NavigationBox = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
`;

const NavigationBoxHeader = styled.div`
  padding: 0.9rem;
`;

const NavigationBoxBody = styled.div``;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccordionItem = styled.div`
  padding: 0.9rem;
`;

function RouteInfo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { info, strategyList, polyline } = useSelector(
    store => store.routeDetail
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    startLocation,
    startInfo,
    endLocation,
    endInfo,
    distance,
    formattedTime,
    distanceInKm,
    taxi_costs,
    totalTolls,
    trafficLights,
    travel_mode,
  } = info;

  const { instructions, navigations, orientations, roadStatus, roadDistance } =
    polyline;

  const totalRoadDistance = calculateTotalRoadDistance(roadDistance);
  const status = evaluateRoadStatus(roadStatus);

  console.log(totalRoadDistance, status);

  const navigate = useNavigate();

  const search = location.search;

  const handleGoBack = () => {
    dispatch(setIsClickNavigation(false));
    navigate(`/map/routes${search}`, {
      state: "fromDetail",
    });
  };

  const handleChange = panel => (event, newExpanded) => {
    setIsExpanded(newExpanded ? panel : false);
  };

  console.log(info, polyline);

  if (!info && !!polyline) return <div>Loading...</div>;

  return (
    <Container>
      <RouteInfoHeader>
        <IconButton aria-label="go back" onClick={handleGoBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <StartToEndBox>
          {startLocation.name} {endLocation.name}
        </StartToEndBox>
      </RouteInfoHeader>

      <RouteInfoBody>
        <Card>
          <CardContent>
            <DetailBox>
              <DetailItem>
                出行方式：{travel_mode === "driving" && "驾车"}
              </DetailItem>
              <DetailItem>距离：{distanceInKm}KM</DetailItem>
              <DetailItem>耗时：{formattedTime}</DetailItem>
              <DetailItem>需经过{trafficLights}个红绿灯</DetailItem>
              <DetailItem>此路线收费{totalTolls}元</DetailItem>
              {taxi_costs && <DetailItem>打车预计{taxi_costs}元</DetailItem>}
            </DetailBox>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <NavigationBox>
              <NavigationBoxHeader>导航路线</NavigationBoxHeader>
              <NavigationBoxBody>
                {instructions.map((instruction, index) => (
                  <Accordion
                    key={`${index}-${instruction}`}
                    expanded={isExpanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary>
                      <AccordionHeader>
                        <AccordionItem>
                          <RouteDirectionIcon
                            orientation={orientations[index]}
                          />
                        </AccordionItem>
                        <AccordionItem>-</AccordionItem>
                        <AccordionItem>{instruction}</AccordionItem>
                      </AccordionHeader>
                    </AccordionSummary>
                    <AccordionDetails>
                      <AccordionItem>{status[index]}</AccordionItem>
                      <AccordionItem>
                        路段总距离:{totalRoadDistance[index]}
                      </AccordionItem>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </NavigationBoxBody>
            </NavigationBox>
          </CardContent>
        </Card>
      </RouteInfoBody>
    </Container>
  );
}

export default RouteInfo;
