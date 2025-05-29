import { forwardRef } from "react";
import styled from "styled-components";

const StyledTripCard = styled.div`
  position: absolute;
  width: 450px;
  height: 600px;
  right: -650px;
  bottom: 75px;
  background-color: #eee;
  border-radius: 10px;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transform-origin: bottom left;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: rotate(-90deg);

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CityNameText = styled.div`
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  margin: 1.6rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  pointer-events: none;
`;

const TripCard = forwardRef(({ handleClick, cityImage, cityName }, ref) => {
  console.log(cityImage);
  return (
    <StyledTripCard ref={ref} $bgImage={cityImage} onClick={handleClick}>
      <CityNameText>{cityName}</CityNameText>
    </StyledTripCard>
  );
});

export default TripCard;
