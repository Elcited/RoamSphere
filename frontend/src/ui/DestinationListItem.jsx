import { useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledDestinationListItem = styled.div`
  padding: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

function DestinationListItem({ img }) {
  const imgRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.1,
      y: "-15px",
      duration: 0.5,
      ease: "back",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back",
    });
  };

  return (
    <StyledDestinationListItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledImg src={img} alt="Destination" ref={imgRef} />
    </StyledDestinationListItem>
  );
}

export default DestinationListItem;
