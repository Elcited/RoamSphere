import styled from "styled-components";
import TransitStartLocation from "./TransitStartLocation";
import TransitEndLocation from "./TransitEndLocation";
import TransitWalkingStep from "./TransitWalkingStep";
import TransitVehicleStep from "./TransitVehicleStep";

const RouteInfoBody = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const NavigationBox = styled.div`
  font-size: 1.3rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
`;

const NavigationBoxBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function TransitRouteInfoBody({
  startLocation,
  startInfo,
  endLocation,
  endInfo,
  distance,
  duration,
  nightflag,
  transitFee,
  transitSteps,
}) {
  return (
    <div>
      <RouteInfoBody>
        <NavigationBox>
          <NavigationBoxBody>
            <TransitStartLocation location={startLocation} info={startInfo} />

            {transitSteps.map((step, index) => {
              const elements = [];

              if (step.walking) {
                elements.push(
                  <TransitWalkingStep
                    instructions={step.walking.instructions}
                    duration={step.walking.duration}
                    distance={step.walking.distance}
                  />
                );
              }

              if (Array.isArray(step.bus) && step.bus.length > 0) {
                elements.push(
                  <TransitVehicleStep data={step.bus} type="bus" />
                );
              }

              if (Array.isArray(step.subway) && step.subway.length > 0) {
                elements.push(
                  <TransitVehicleStep data={step.subway} type="subway" />
                );
              }

              if (
                Array.isArray(step.cityRailway) &&
                step.cityRailway.length > 0
              ) {
                elements.push(
                  <TransitVehicleStep
                    data={step.cityRailway}
                    type="cityRailway"
                  />
                );
              }

              if (step.railway && typeof step.railway === "object") {
                elements.push(
                  <TransitVehicleStep data={step.railway} type="railway" />
                );
              }

              if (step.taxi && typeof step.taxi === "object") {
                elements.push(
                  <TransitVehicleStep data={step.taxi} type="taxi" />
                );
              }

              return elements;
            })}

            <TransitEndLocation location={endLocation} info={endInfo} />
          </NavigationBoxBody>
        </NavigationBox>
      </RouteInfoBody>
    </div>
  );
}

export default TransitRouteInfoBody;
