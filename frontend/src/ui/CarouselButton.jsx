import React from "react";
import styled from "styled-components";

// 按钮样式
const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.5rem;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  ${({ direction }) => direction === "left" && `left: 10px;`}
  ${({ direction }) => direction === "right" && `right: 10px;`}
`;

const CarouselButton = ({ direction, onClick }) => {
  return (
    <Button direction={direction} onClick={onClick}>
      {direction === "left" ? "‹" : "›"}
    </Button>
  );
};

export default CarouselButton;
