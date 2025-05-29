import { useState, useCallback } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import RouteDirectionIcon from "./RouteDirectionIcon";
import SimpleRouteInfoBodyIcon from "./SimpleRouteInfoBodyIcon";
import {
  evaluateRoadStatus,
  calculateTotalRoadDistance,
} from "../utils/routesHelpers";
import formatReadableAddress from "../utils/formatReadableAddress";
import useWalkTypeLabels from "../hooks/useWalkTypeLabels";

const RouteInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const NavigationBox = styled.div`
  font-size: 1.3rem;
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
`;

const NavigationBoxHeader = styled.div`
  font-size: 1.8rem;
  padding: 0.9rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const NavigationBoxBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  color: #666;
`;

const StartLocationBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: #333;
`;

const EndLocationBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: #333;
`;

const LocationName = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const CompactAccordionSummary = styled(AccordionSummary)`
  padding: 0;
  min-height: auto;
  & .MuiAccordionSummary-content {
    margin: 0;
  }
`;

const CompactAccordionDetails = styled(AccordionDetails)`
  padding: 0.2rem 0;
`;

const AccordionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AccordionHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const AccordionHeaderBottom = styled.div`
  display: flex;
  margin-left: 3rem;
  align-items: center;
  position: relative;
  gap: 0.8rem;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
    margin-left: 0.8rem;
  }
`;

const AccordionBody = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-left: 3rem;
  align-items: center;
  flex-wrap: wrap;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
    margin-left: 0.8rem;
  }
`;

const CompactAccordionItem = styled.div`
  padding: 0.2rem 0;
  margin-right: 0.6rem;
  font-size: 1.2rem;
`;

function SimpleRouteInfoBody({
  routeInfo,
  routeInstructions,
  routeNavigations,
  routeOrientations,
  routeRoadCities,
  routeRoadStatus,
  routeRoadDistance,
  routeWalkTypes,
  routeStepDistance,
  travelMode,
}) {
  const [isExpanded, setIsExpanded] = useState(null);
  const { startLocation, startInfo, endLocation, endInfo } = routeInfo;

  const drivingRouteStatus = evaluateRoadStatus(routeRoadStatus);
  const calculatedDistance = calculateTotalRoadDistance(routeRoadDistance);
  const startAddress = formatReadableAddress(startInfo);
  const endAddress = formatReadableAddress(endInfo);
  const types = useWalkTypeLabels(routeWalkTypes);

  const isDriving = travelMode === "driving";

  const handleChange = useCallback(index => {
    setIsExpanded(prev => (prev === index ? null : index));
  }, []);

  return (
    <div>
      <RouteInfoBody>
        <NavigationBox>
          <NavigationBoxHeader>
            <div>{startLocation.name}</div>
            <SimpleRouteInfoBodyIcon travelMode={travelMode} />{" "}
            <div>{endLocation.name}</div>
          </NavigationBoxHeader>
          <NavigationBoxBody>
            <StartLocationBox>
              <LocationName>{startLocation.name}</LocationName>
              <div>{startAddress}</div>
            </StartLocationBox>
            {routeInstructions?.map((instruction, index) => (
              <Accordion
                key={`${index}-${instruction}`}
                expanded={isExpanded === index}
                onChange={() => handleChange(index)}
                elevation={0}
                square
                disableGutters
                sx={{
                  border: "none",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&::before": { display: "none" },
                }}
              >
                <CompactAccordionSummary>
                  <AccordionHeader>
                    <AccordionHeaderTop>
                      <CompactAccordionItem>
                        <RouteDirectionIcon
                          orientation={routeOrientations[index]}
                        />
                      </CompactAccordionItem>
                      <CompactAccordionItem>{instruction}</CompactAccordionItem>
                    </AccordionHeaderTop>
                    <AccordionHeaderBottom>
                      {isDriving ? (
                        <>
                          <CompactAccordionItem>
                            {calculatedDistance[index]}米
                          </CompactAccordionItem>
                          <CompactAccordionItem>
                            {drivingRouteStatus[index]}
                          </CompactAccordionItem>
                        </>
                      ) : (
                        <>
                          <CompactAccordionItem>
                            {routeStepDistance[index]}米
                          </CompactAccordionItem>
                          <CompactAccordionItem>
                            {types[index]}
                          </CompactAccordionItem>
                        </>
                      )}
                    </AccordionHeaderBottom>
                  </AccordionHeader>
                </CompactAccordionSummary>
                <CompactAccordionDetails>
                  <AccordionBody>
                    <CompactAccordionItem>
                      {routeNavigations[index]}
                    </CompactAccordionItem>
                    <CompactAccordionItem>
                      方向:{routeOrientations[index]}
                    </CompactAccordionItem>
                    {isDriving && (
                      <>
                        <CompactAccordionItem>
                          {routeRoadCities[index].at(0).city}
                        </CompactAccordionItem>
                        <CompactAccordionItem>
                          {routeRoadCities[index].at(0).districts.name}
                        </CompactAccordionItem>
                      </>
                    )}
                  </AccordionBody>
                </CompactAccordionDetails>
              </Accordion>
            ))}
            <EndLocationBox>
              <LocationName>{endLocation.name}</LocationName>
              <div>{endAddress}</div>
            </EndLocationBox>
          </NavigationBoxBody>
        </NavigationBox>
      </RouteInfoBody>
    </div>
  );
}

export default SimpleRouteInfoBody;
