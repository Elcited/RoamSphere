import { useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import useQueryUpdater from "../hooks/useQueryUpdater";

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

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
  height: 240px;
  cursor: pointer;
`;

const CityName = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  pointer-events: none;
`;

function DestinationListItem({ img, name }) {
  const imgRef = useRef(null);
  const nameRef = useRef(null);

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleClick = name => {
    updateQueryAndNavigate({}, "/map", {
      state: { cityName: name },
    });
  };

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.1,
      y: "-12px",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(nameRef.current, {
      bottom: "50%",
      right: "50%",
      xPercent: 50,
      yPercent: 50,
      scale: 1.8,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(nameRef.current, {
      bottom: "12px",
      right: "16px",
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <StyledDestinationListItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(name)}
    >
      <ImgBox>
        <StyledImg src={img} alt={name} ref={imgRef} />
        <CityName ref={nameRef}>{name}</CityName>
      </ImgBox>
    </StyledDestinationListItem>
  );
}

export default DestinationListItem;
