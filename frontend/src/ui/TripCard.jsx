import React, { forwardRef } from "react";
import styled from "styled-components";

import tripImage from "../assets/images/hero.jpg";

const StyledTripCard = styled.div`
  position: absolute;
  width: 450px;
  height: 600px;
  right: -650px;
  bottom: 75px;
  background-color: #ddd;
  border-radius: 10px;
  background-image: url(${tripImage});
  background-size: cover;
  opacity: 0;
  cursor: pointer;
  transform-origin: bottom left;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: rotate(-90deg);
`;

const TripCard = forwardRef(({ handleClick }, ref) => {
  return <StyledTripCard ref={ref} onClick={handleClick}></StyledTripCard>;
});

export default TripCard;
