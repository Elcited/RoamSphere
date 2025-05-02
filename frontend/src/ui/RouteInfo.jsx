import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  setHighlightedSegment,
  setIsClickNavigation,
} from "../features/routeDetail/routeSlice";
import RouteDirectionIcon from "./RouteDirectionIcon";
import {
  calculateTotalRoadDistance,
  evaluateRoadStatus,
} from "../utils/routesHelpers";
import { useState } from "react";
import useQueryUpdater from "../hooks/useQueryUpdater";

const Container = styled.div`
  padding: 0.9rem;
  position: relative;
  background-color: #fff;
`;

const RouteInfoHeader = styled.div`
  display: flex;
  gap: 1.2rem;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const StartToEndBox = styled.div`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
`;

const RouteInfoOverview = styled.div`
  padding: 0.9rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const RouteInfoOverviewItem = styled.div``;

const RouteInfoBody = styled.div`
  width: 38rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

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
  font-size: 1.3rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
`;

const NavigationBoxHeader = styled.div`
  font-size: 2rem;
  padding: 0.9rem;
`;

const NavigationBoxBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const AccordionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AccordionHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const AccordionHeaderBottom = styled.div`
  display: flex;
  margin-left: 4.3rem;
  align-items: center;
  position: relative;
  gap: 1.2rem;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
    margin-left: 1rem;
  }
`;

const AccordionBody = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: 4.3rem;
  align-items: center;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
    margin-left: 1rem;
  }
`;

const AccordionItem = styled.div`
  padding: 0.9rem 0;
`;

function RouteInfo() {
  const dispatch = useDispatch();
  const { info, polyline } = useSelector(store => store.route);
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
  } = info || {};

  const {
    instructions,
    navigations,
    orientations,
    roadStatus,
    roadDistance,
    roadCities,
    polylinesForRenderDetails,
  } = polyline || {};

  const totalRoadDistance = calculateTotalRoadDistance(roadDistance);
  const status = evaluateRoadStatus(roadStatus);

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleGoBack = () => {
    dispatch(setIsClickNavigation(false));

    updateQueryAndNavigate(
      {
        strategy: null,
      },
      "/map/routes/route_overview",
      {
        replace: true,
      }
    );
  };

  const handleClick = highlightedSegment => {
    console.log(highlightedSegment);
    dispatch(setHighlightedSegment(highlightedSegment));
  };

  const handleChange = panel => (event, newExpanded) => {
    setIsExpanded(newExpanded ? panel : false);
  };

  if (!info && !!polyline) return <div>Loading...</div>;

  return (
    <Container>
      <RouteInfoHeader>
        <IconButton aria-label="go back" onClick={handleGoBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <StartToEndBox>
          <div>
            从{startLocation?.name} {startInfo?.province} {startInfo?.city}
          </div>
          <div>
            到{endLocation?.name} {endInfo?.province} {endInfo?.city}
          </div>
        </StartToEndBox>
      </RouteInfoHeader>

      <RouteInfoOverview>
        <RouteInfoOverviewItem>
          <h1>
            <span>{formattedTime}</span>
            <span>{distanceInKm}公里</span>
          </h1>
        </RouteInfoOverviewItem>
        <RouteInfoOverviewItem>
          预计收费{totalTolls}元，经过{trafficLights}个红绿灯
        </RouteInfoOverviewItem>
      </RouteInfoOverview>

      <RouteInfoBody>
        <NavigationBox>
          <NavigationBoxHeader>
            <div>
              {startLocation?.name} {startInfo?.province} <span>🚗</span>{" "}
              {endLocation?.name} {endInfo?.province}
            </div>
          </NavigationBoxHeader>
          <NavigationBoxBody>
            {instructions?.map((instruction, index) => (
              <Accordion
                key={`${index}-${instruction}`}
                expanded={isExpanded === index}
                onChange={handleChange(index)}
                onClick={() => handleClick(polylinesForRenderDetails[index])}
                elevation={0}
                square
                disableGutters
                sx={{
                  border: "none",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary>
                  <AccordionHeader>
                    <AccordionHeaderTop>
                      <AccordionItem>
                        <RouteDirectionIcon orientation={orientations[index]} />
                      </AccordionItem>
                      <AccordionItem>{instruction}</AccordionItem>
                    </AccordionHeaderTop>
                    <AccordionHeaderBottom>
                      <AccordionItem>
                        {totalRoadDistance[index]}米
                      </AccordionItem>
                      <AccordionItem>{status[index]}</AccordionItem>
                    </AccordionHeaderBottom>
                  </AccordionHeader>
                </AccordionSummary>
                <AccordionDetails>
                  <AccordionBody>
                    <AccordionItem>{navigations[index]}</AccordionItem>
                    <AccordionItem>方向:{orientations[index]}</AccordionItem>
                    <AccordionItem>
                      {roadCities[index].at(0).city}
                    </AccordionItem>
                    <AccordionItem>
                      {roadCities[index].at(0).districts.name}
                    </AccordionItem>
                  </AccordionBody>
                </AccordionDetails>
              </Accordion>
            ))}
          </NavigationBoxBody>
        </NavigationBox>

        {/* <Card>
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
        </Card> */}
      </RouteInfoBody>
    </Container>
  );
}

export default RouteInfo;
