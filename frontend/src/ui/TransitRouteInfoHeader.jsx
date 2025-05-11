import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useQueryUpdater from "../hooks/useQueryUpdater";

const RouteInfoHeader = styled.div`
  display: flex;
  gap: 1.2rem;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const StartToEndBox = styled.div`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  flex: 1;
  min-width: 0;
`;

const SingleLineText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function TransitRouteInfoHeader({
  startLocation,
  startInfo,
  endLocation,
  endInfo,
}) {
  const { updateQueryAndNavigate } = useQueryUpdater();
  const handleGoBack = () => {
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

  return (
    <div>
      <RouteInfoHeader>
        <IconButton aria-label="go back" onClick={handleGoBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <StartToEndBox>
          <SingleLineText>
            从{startLocation.name}
            {","}
            {startInfo.regeocode.addressComponent.district}
            {","}
            {startInfo.regeocode.addressComponent.city}
          </SingleLineText>
          <SingleLineText>
            到{endLocation.name}
            {","}
            {endInfo.regeocode.addressComponent.district}
            {","}
            {endInfo.regeocode.addressComponent.city}
          </SingleLineText>
        </StartToEndBox>
      </RouteInfoHeader>
    </div>
  );
}

export default TransitRouteInfoHeader;
