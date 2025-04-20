import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const StyledHeader = styled.header`
  min-width: 100vw;
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  padding: 1.2rem;
  background-color: white;
  position: fixed;
  transform: translateY(-100%);
  transition: transform 0.5s ease-in-out;
  z-index: 9999;

  &.visible {
    transform: translateY(0);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <NavBar />
    </StyledHeader>
  );
}

export default Header;
