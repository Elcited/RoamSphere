import React from "react";
import styled, { keyframes } from "styled-components";

const btnGlow = keyframes`
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 300%;
  }
`;

const noiseBackground = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(50px, 30px, 0);
  }
  40% {
    transform: translate3d(10px, 50px, 0);
  }
  60% {
    transform: translate3d(30px, 20px, 0);
  }
  80% {
    transform: translate3d(50px, 0, 0);
  }
  100% {
    transform: translate3d(100px, 0, 0);
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 999em;
  color: white;
  font: 500 20px / 1 "Chivo Mono", monospace;
  letter-spacing: 0.075em;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
  }

  &:hover .btn__background:before {
    background: #4cede1;
    transition: background 0.07s linear;
  }

  &:hover .btn__background:after {
    opacity: 1;
    transition: opacity 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s;
  }

  &:hover .btn__inner:before {
    opacity: 0.5;
  }

  &:hover .btn__label:before {
    transform: translate3d(0, 100%, 0);
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(1, -0.6, 0, 1.6);
  }

  &:hover .btn__label:after {
    transform: translate3d(0, 0, 0);
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(1, -0.6, 0, 1.6);
  }
`;

const BtnInner = styled.span`
  padding: 1px;
  position: relative;
  z-index: 2;
  display: block;
  overflow: hidden;
  border-radius: inherit;
`;

const BtnLabel = styled.span`
  position: relative;
  display: block;
  overflow: hidden;
  padding: 0.95em 2em 0.9em;
  border-radius: inherit;
  color: transparent;
  white-space: nowrap;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: block;
    padding: inherit;
    width: 100%;
    height: 100%;
    color: white;
    white-space: nowrap;
    transition: transform 0.3s cubic-bezier(1, 0, 0, 1) 0s;
  }

  &:before {
    transform: translate3d(0, 0, 0);
    content: attr(data-label);
  }

  &:after {
    transform: translate3d(0, -100%, 0);
    content: attr(data-hover);
  }
`;

const BtnBackground = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;

  &:before,
  &:after {
    position: absolute;
    inset: 0;
    display: block;
    border-radius: inherit;
    content: "";
  }

  &:before {
    background: white;
    transition: background 0.3s linear 0s;
  }

  &:after {
    animation: ${btnGlow} 5s infinite linear;
    background: linear-gradient(
        -20deg,
        #00f8f1,
        #00f8f120 16.5%,
        #00f8f1 33%,
        #00f8f110 49.5%,
        #00f8f1 66%,
        #00f8f100 85.5%,
        #00f8f1 100%
      )
      0 100% / 100% 200%;
    filter: blur(5px);
    opacity: 0;
    transition: opacity 0s linear 0s;
  }
`;

const BtnLabelBackground = styled.span`
  position: absolute;
  inset: -100px;
  display: block;
  background: #093740 url("https://assets.codepen.io/5817405/noise_2.png");
  background-blend-mode: overlay;
  animation: ${noiseBackground} 0.5s steps(1) infinite;
`;

const HeroFormButton = ({ label, hoverLabel, handleClick }) => {
  return (
    <ButtonWrapper onClick={() => handleClick(123)}>
      <BtnInner className="btn__inner">
        <BtnLabel
          className="btn__label"
          data-label={label}
          data-hover={hoverLabel}
        >
          {label}
          <BtnLabelBackground />
        </BtnLabel>
      </BtnInner>
      <BtnBackground className="btn__background" />
    </ButtonWrapper>
  );
};

export default HeroFormButton;
