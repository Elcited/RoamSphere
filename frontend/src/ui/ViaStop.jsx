import styled from "styled-components";
import viaIcon from "../assets/images/transit/waypoint_start.png";

const StopContainer = styled.div`
  display: flex;
  position: relative;
  padding-left: 24px;
`;

const TextLine = styled.div`
  color: #777;
`;

const DotIcon = styled.div`
  position: absolute;
  left: -22px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-image: url(${viaIcon});
  background-size: contain;
  background-repeat: no-repeat;
`;

function ViaStop({ viaStopName }) {
  return (
    <StopContainer>
      <DotIcon />
      <TextLine>{viaStopName}</TextLine>
    </StopContainer>
  );
}

export default ViaStop;
